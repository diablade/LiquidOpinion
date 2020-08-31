const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const {ROLE, PERM} = require('../tools/permission');
const {authUser, authRole} = require('../tools/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/refreshtoken', authMasterUser, refreshToken);
router.put('/update/user', authUser, userController.update);
router.put('/update/email', authUser, userController.updateEmail);
router.put('/update/password', authUser, userController.updatePassword);
router.get('/me', authUser, userController.getMe);
router.get('/all', authUser, PERM(ROLE.ADMIN), userController.getAll);
router.get('/summaries', userController.getUsersSummary);
router.get('/:id', authUser, PERM(ROLE.ADMIN), userController.getUser);
router.delete('/:id', authUser, userController.deleteUser);
router.post('/lostPassword', authUser, userController.lostPassword);

module.exports = router;
