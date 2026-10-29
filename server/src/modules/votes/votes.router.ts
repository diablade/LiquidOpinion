import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { castVoteSchema } from './votes.validators';
import * as votesService from './votes.service';
import type { IUser } from '../../models/user.model';

const router = Router();

router.post('/', requireAuth, validate(castVoteSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const { surveyId, candidateId, opinionId } = req.body;
    const vote = await votesService.castVote(user.id, surveyId, candidateId, opinionId);
    res.status(201).json(vote);
  } catch (err) { next(err); }
});

router.get('/tally/:surveyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tally = await votesService.getTally(req.params['surveyId']!);
    res.json(tally);
  } catch (err) { next(err); }
});

export { router as votesRouter };
