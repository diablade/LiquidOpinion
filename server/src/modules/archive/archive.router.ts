import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth, requireAdmin } from '../../middleware/authGuard';
import * as archiveService from './archive.service';
import { Survey } from '../../models/survey.model';
import type { IUser } from '../../models/user.model';
import { Types } from 'mongoose';

const router = Router();

router.use(requireAuth);

// Manual archive trigger — admin or survey admin
router.post('/:surveyId/run', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const survey = await Survey.findById(req.params['surveyId']);
    if (!survey) return next(Object.assign(new Error('Survey not found'), { status: 404 }));

    const uid = new Types.ObjectId(user.id);
    const isSurveyAdmin =
      survey.creator.userId.equals(uid) || survey.admins.some((m) => m.userId.equals(uid));

    if (user.role !== 'ADMIN' && !isSurveyAdmin) {
      return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    }

    const result = await archiveService.archiveSurveyVotes(
      req.params['surveyId']!,
      survey.archivePolicy?.retentionDays ?? 30,
      'manual',
      user.id,
    );
    res.json(result);
  } catch (err) { next(err); }
});

// List archive runs for a survey
router.get('/:surveyId/runs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const runs = await archiveService.listArchiveRuns(req.params['surveyId']!);
    res.json(runs);
  } catch (err) { next(err); }
});

// Hard-delete archived votes (admin only, for GDPR purge)
router.delete('/:surveyId/purge', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await archiveService.deleteArchivedVotes(req.params['surveyId']!, (req.user as IUser).id);
    res.json(result);
  } catch (err) { next(err); }
});

// Global archive run (admin only)
router.post('/run-all', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await archiveService.runGlobalArchiver();
    res.json(results);
  } catch (err) { next(err); }
});

export { router as archiveRouter };
