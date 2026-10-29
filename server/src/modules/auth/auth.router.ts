import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { validate } from '../../middleware/validate';
import { signupSchema, loginSchema } from './auth.validators';
import { signup, loginWithCredentials, tokenForOAuthUser } from './auth.service';
import type { IUser } from '../../models/user.model';

const router = Router();

router.post('/signup', validate(signupSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, tokens } = await signup(req.body);
    res.status(201).json({ user: sanitize(user), ...tokens });
  } catch (err) {
    next(err);
  }
});

router.post('/login', validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await loginWithCredentials(email, password);
    res.json({ user: sanitize(user), ...tokens });
  } catch (err) {
    next(err);
  }
});

// ── Facebook OAuth ────────────────────────────────────────────────────────────
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/api/auth/failure' }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    const tokens = tokenForOAuthUser(user);
    res.json({ user: sanitize(user), ...tokens });
  },
);

router.get('/failure', (_req: Request, res: Response) => {
  res.status(401).json({ message: 'OAuth authentication failed' });
});

// ── Me ────────────────────────────────────────────────────────────────────────
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    res.json({ user: sanitize(req.user as IUser) });
  },
);

function sanitize(user: IUser) {
  const { password, resetPasswordToken, resetPasswordExpires, ...safe } = (user as any).toObject
    ? (user as any).toObject()
    : user;
  return safe;
}

export { router as authRouter };
