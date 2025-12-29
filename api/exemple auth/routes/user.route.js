import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authenticateToken } from '../services/auth.service.js';
import { adminOnly } from '../services/permission.service.js';

const router = express.Router();

router.get('/me', authenticateToken, UserController.getLoggedUser);
router.post('/update', authenticateToken, adminOnly, UserController.update);
router.post('/create', authenticateToken, adminOnly, UserController.create);
router.delete('/delete/:id', authenticateToken, adminOnly, UserController.delete);
router.get('/all', authenticateToken, adminOnly, UserController.getAll);
router.get('/:id', authenticateToken, adminOnly, UserController.getById);

export default router;
