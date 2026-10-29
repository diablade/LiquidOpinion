import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth, requireAdmin } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { updateProfileSchema, updatePasswordSchema, adminRoleSchema } from './users.validators';
import * as usersService from './users.service';
import type { IUser } from '../../models/user.model';

const router = Router();

router.use(requireAuth);

router.get('/me', (req: Request, res: Response, next: NextFunction) => {
  usersService.getProfile((req.user as IUser).id).then((u) => res.json(u)).catch(next);
});

router.put('/me', validate(updateProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.updateProfile((req.user as IUser).id, req.body);
    res.json(user);
  } catch (err) { next(err); }
});

router.put('/me/password', validate(updatePasswordSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersService.updatePassword((req.user as IUser).id, req.body.currentPassword, req.body.newPassword);
    res.json({ message: 'Password updated' });
  } catch (err) { next(err); }
});

// ── Admin-only ─────────────────────────────────────────────────────────────────
router.get('/', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(String(req.query['page'] ?? '1'), 10));
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '20'), 10)));
    const result = await usersService.listUsers(page, limit);
    res.json(result);
  } catch (err) { next(err); }
});

router.put('/:id/role', requireAdmin, validate(adminRoleSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.setRole(req.params['id']!, req.body.role);
    res.json(user);
  } catch (err) { next(err); }
});

router.delete('/:id', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersService.deleteUser(req.params['id']!);
    res.status(204).end();
  } catch (err) { next(err); }
});

export { router as usersRouter };
