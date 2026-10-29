import { Types } from 'mongoose';
import slugify from './slugify';
import { Survey, ISurvey, SurveyMember } from '../../models/survey.model';
import { User, IUser } from '../../models/user.model';

function memberRef(user: IUser): SurveyMember {
  return { userId: user._id, username: user.username, photo: user.photo };
}

export async function createSurvey(creatorId: string, data: Record<string, unknown>): Promise<ISurvey> {
  const creator = await User.findById(creatorId);
  if (!creator) throw Object.assign(new Error('User not found'), { status: 404 });

  const base = slugify(String(data['title']));
  let slug = base;
  let n = 1;
  while (await Survey.exists({ slug })) slug = `${base}-${n++}`;

  return Survey.create({
    ...data,
    slug,
    creator: memberRef(creator),
    admins: [memberRef(creator)],
  });
}

export async function getSurvey(surveyId: string, requesterId?: string, requesterRole?: string): Promise<ISurvey> {
  const survey = await Survey.findById(surveyId);
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });
  assertCanView(survey, requesterId, requesterRole);
  return survey;
}

export async function listPublicSurveys(opts: {
  page: number;
  limit: number;
  tags?: string;
  search?: string;
}): Promise<{ surveys: ISurvey[]; total: number }> {
  const filter: Record<string, unknown> = { visibility: 'public', activate: true };
  if (opts.tags) filter['tags'] = { $in: opts.tags.split(',').map((t) => t.trim()) };
  if (opts.search) filter['$text'] = { $search: opts.search };
  const skip = (opts.page - 1) * opts.limit;
  const [surveys, total] = await Promise.all([
    Survey.find(filter).skip(skip).limit(opts.limit).sort({ createdAt: -1 }),
    Survey.countDocuments(filter),
  ]);
  return { surveys, total };
}

export async function listMySurveys(creatorId: string): Promise<ISurvey[]> {
  return Survey.find({ 'creator.userId': new Types.ObjectId(creatorId) }).sort({ createdAt: -1 });
}

export async function updateSurvey(
  surveyId: string,
  requesterId: string,
  requesterRole: string,
  data: Record<string, unknown>,
): Promise<ISurvey> {
  const survey = await Survey.findById(surveyId);
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });
  assertCanEdit(survey, requesterId, requesterRole);
  Object.assign(survey, data);
  return survey.save();
}

export async function setPublishState(
  surveyId: string,
  requesterId: string,
  requesterRole: string,
  activate: boolean,
): Promise<ISurvey> {
  const survey = await Survey.findById(surveyId);
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });
  assertCanEdit(survey, requesterId, requesterRole);
  survey.activate = activate;
  return survey.save();
}

export async function deleteSurvey(surveyId: string, requesterId: string, requesterRole: string): Promise<void> {
  const survey = await Survey.findById(surveyId);
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });
  assertCanAdmin(survey, requesterId, requesterRole);
  await survey.deleteOne();
}

export async function updateArchivePolicy(
  surveyId: string,
  requesterId: string,
  requesterRole: string,
  policy: { enabled: boolean; retentionDays: number },
): Promise<ISurvey> {
  const survey = await Survey.findById(surveyId);
  if (!survey) throw Object.assign(new Error('Survey not found'), { status: 404 });
  assertCanAdmin(survey, requesterId, requesterRole);
  survey.archivePolicy = policy;
  return survey.save();
}

// ── Permission helpers ────────────────────────────────────────────────────────

function isMember(survey: ISurvey, userId: string): boolean {
  const id = new Types.ObjectId(userId);
  return (
    survey.creator.userId.equals(id) ||
    survey.admins.some((m) => m.userId.equals(id)) ||
    survey.editors.some((m) => m.userId.equals(id)) ||
    survey.members.some((m) => m.userId.equals(id))
  );
}

function isEditor(survey: ISurvey, userId: string): boolean {
  const id = new Types.ObjectId(userId);
  return (
    survey.creator.userId.equals(id) ||
    survey.admins.some((m) => m.userId.equals(id)) ||
    survey.editors.some((m) => m.userId.equals(id))
  );
}

function isAdmin(survey: ISurvey, userId: string): boolean {
  const id = new Types.ObjectId(userId);
  return survey.creator.userId.equals(id) || survey.admins.some((m) => m.userId.equals(id));
}

function assertCanView(survey: ISurvey, userId?: string, role?: string): void {
  if (role === 'ADMIN') return;
  if (survey.visibility === 'public') return;
  if (userId && isMember(survey, userId)) return;
  throw Object.assign(new Error('Not authorized to view this survey'), { status: 403 });
}

function assertCanEdit(survey: ISurvey, userId: string, role: string): void {
  if (role === 'ADMIN') return;
  if (isEditor(survey, userId)) return;
  throw Object.assign(new Error('Not authorized to edit this survey'), { status: 403 });
}

function assertCanAdmin(survey: ISurvey, userId: string, role: string): void {
  if (role === 'ADMIN') return;
  if (isAdmin(survey, userId)) return;
  throw Object.assign(new Error('Not authorized to administrate this survey'), { status: 403 });
}
