import { Router } from 'express';
import { authLimiter } from './middleware/rateLimiter';
import { authRouter } from './modules/auth/auth.router';
import { usersRouter } from './modules/users/users.router';
import { surveysRouter } from './modules/surveys/surveys.router';
import { votesRouter } from './modules/votes/votes.router';
import { archiveRouter } from './modules/archive/archive.router';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.use('/auth', authLimiter, authRouter);
router.use('/users', usersRouter);
router.use('/surveys', surveysRouter);
router.use('/votes', votesRouter);
router.use('/archive', archiveRouter);

export { router as apiRouter };
