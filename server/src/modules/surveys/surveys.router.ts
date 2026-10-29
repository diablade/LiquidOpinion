import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth, optionalAuth } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import {
  createSurveySchema,
  updateSurveySchema,
  publishSchema,
  surveyQuerySchema,
} from './surveys.validators';
import * as surveysService from './surveys.service';
import type { IUser } from '../../models/user.model';

const router = Router();

router.get('/', optionalAuth, validate(surveyQuerySchema, 'query'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await surveysService.listPublicSurveys(req.query as any);
    res.json(result);
  } catch (err) { next(err); }
});

router.get('/mine', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const surveys = await surveysService.listMySurveys((req.user as IUser).id);
    res.json(surveys);
  } catch (err) { next(err); }
});

router.get('/:id', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser | undefined;
    const survey = await surveysService.getSurvey(req.params['id']!, user?.id, user?.role);
    res.json(survey);
  } catch (err) { next(err); }
});

router.post('/', requireAuth, validate(createSurveySchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const survey = await surveysService.createSurvey((req.user as IUser).id, req.body);
    res.status(201).json(survey);
  } catch (err) { next(err); }
});

router.put('/:id', requireAuth, validate(updateSurveySchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const survey = await surveysService.updateSurvey(req.params['id']!, user.id, user.role, req.body);
    res.json(survey);
  } catch (err) { next(err); }
});

router.patch('/:id/publish', requireAuth, validate(publishSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const survey = await surveysService.setPublishState(req.params['id']!, user.id, user.role, req.body.activate);
    res.json(survey);
  } catch (err) { next(err); }
});

router.patch('/:id/archive-policy', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const survey = await surveysService.updateArchivePolicy(req.params['id']!, user.id, user.role, req.body);
    res.json(survey);
  } catch (err) { next(err); }
});

router.delete('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    await surveysService.deleteSurvey(req.params['id']!, user.id, user.role);
    res.status(204).end();
  } catch (err) { next(err); }
});

export { router as surveysRouter };
