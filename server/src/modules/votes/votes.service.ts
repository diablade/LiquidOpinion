import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Vote, IVote } from '../../models/vote.model';
import { Survey, ISurvey } from '../../models/survey.model';

const HASH_ROUNDS = 4;

export interface TallyEntry {
  candidateId: string;
  candidateTitle: string;
  results: Record<string, number>;
  totalVotes: number;
}

export async function castVote(
  userId: string,
  surveyId: string,
  candidateId: string,
  opinionId: string,
): Promise<IVote> {
  const survey = await Survey.findById(surveyId);
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });
  if (!survey.activate) throw Object.assign(new Error('Survey is not active'), { status: 400 });
  if (survey.expireAt && survey.expireAt < new Date()) throw Object.assign(new Error('Survey has expired'), { status: 400 });

  const candidate = survey.candidates.find((c) => c._id.equals(new Types.ObjectId(candidateId)));
  if (!candidate) throw Object.assign(new Error('Candidate not found'), { status: 404 });

  const opinion = survey.opinions.find((o) => o.id === opinionId);
  if (!opinion) throw Object.assign(new Error('Invalid opinion'), { status: 400 });

  if (survey.visibility === 'private') {
    const uid = new Types.ObjectId(userId);
    const allowed =
      survey.creator.userId.equals(uid) ||
      survey.members.some((m) => m.userId.equals(uid)) ||
      survey.admins.some((m) => m.userId.equals(uid)) ||
      survey.editors.some((m) => m.userId.equals(uid));
    if (!allowed) throw Object.assign(new Error('Access denied'), { status: 403 });
  }

  const hashedUserId = await bcrypt.hash(userId, HASH_ROUNDS);

  // enforce reVoteDelay
  if (survey.reVoteDelayMs > 0) {
    const cutoff = new Date(Date.now() - survey.reVoteDelayMs);
    const recentVotes = await Vote.find({
      surveyId: new Types.ObjectId(surveyId),
      createdAt: { $gte: cutoff },
    }).select('hashedUserId');

    for (const v of recentVotes) {
      if (await bcrypt.compare(userId, v.hashedUserId)) {
        throw Object.assign(new Error('You must wait before voting again'), { status: 429 });
      }
    }
  }

  return Vote.create({ surveyId, candidateId, hashedUserId, opinionId, value: opinion.value });
}

export async function getTally(surveyId: string): Promise<TallyEntry[]> {
  const survey = await Survey.findById(surveyId).lean();
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });

  const votes = await Vote.find({ surveyId: new Types.ObjectId(surveyId), archivedAt: { $exists: false } }).lean();

  return survey.candidates.map((candidate) => {
    const candidateVotes = votes.filter((v) => v.candidateId.equals(candidate._id));
    const results: Record<string, number> = {};
    for (const opinion of survey.opinions) results[opinion.id] = 0;
    for (const vote of candidateVotes) results[vote.opinionId] = (results[vote.opinionId] ?? 0) + 1;

    return {
      candidateId: candidate._id.toString(),
      candidateTitle: candidate.title,
      results,
      totalVotes: candidateVotes.length,
    };
  });
}
