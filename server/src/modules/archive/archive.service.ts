import { Types } from 'mongoose';
import cron from 'node-cron';
import { Vote } from '../../models/vote.model';
import { Survey } from '../../models/survey.model';
import { ArchiveRun } from '../../models/archive.model';
import { env } from '../../config/env';

export interface ArchiveResult {
  surveyId: string;
  votesArchived: number;
}

export async function archiveSurveyVotes(
  surveyId: string,
  retentionDays: number,
  triggeredBy: 'scheduler' | 'manual',
  operatorId?: string,
): Promise<ArchiveResult> {
  const cutoff = new Date(Date.now() - retentionDays * 86_400_000);
  const result = await Vote.updateMany(
    {
      surveyId: new Types.ObjectId(surveyId),
      createdAt: { $lt: cutoff },
      archivedAt: { $exists: false },
    },
    { $set: { archivedAt: new Date() } },
  );

  await ArchiveRun.create({
    surveyId: new Types.ObjectId(surveyId),
    votesArchived: result.modifiedCount,
    triggeredBy,
    operatorId: operatorId ? new Types.ObjectId(operatorId) : undefined,
  });

  return { surveyId, votesArchived: result.modifiedCount };
}

export async function runGlobalArchiver(): Promise<ArchiveResult[]> {
  const surveys = await Survey.find({ 'archivePolicy.enabled': true }).lean();
  const results: ArchiveResult[] = [];

  for (const survey of surveys) {
    const retentionDays = survey.archivePolicy?.retentionDays ?? env.archive.defaultDays;
    const r = await archiveSurveyVotes(survey._id.toString(), retentionDays, 'scheduler');
    results.push(r);
  }

  return results;
}

export async function listArchiveRuns(surveyId: string) {
  return ArchiveRun.find({ surveyId: new Types.ObjectId(surveyId) }).sort({ ranAt: -1 }).limit(50);
}

export async function deleteArchivedVotes(surveyId: string, operatorId: string) {
  const result = await Vote.deleteMany({
    surveyId: new Types.ObjectId(surveyId),
    archivedAt: { $exists: true },
  });
  return { deleted: result.deletedCount };
}

export function startScheduler(): void {
  if (!cron.validate(env.archive.cron)) {
    console.warn(`Invalid ARCHIVE_CRON expression: ${env.archive.cron} — scheduler not started`);
    return;
  }
  cron.schedule(env.archive.cron, async () => {
    console.log('Archive scheduler triggered');
    try {
      const results = await runGlobalArchiver();
      const total = results.reduce((sum, r) => sum + r.votesArchived, 0);
      console.log(`Archive run complete — ${total} votes archived across ${results.length} surveys`);
    } catch (err) {
      console.error('Archive scheduler error:', err);
    }
  });
  console.log(`Archive scheduler started (cron: ${env.archive.cron})`);
}
