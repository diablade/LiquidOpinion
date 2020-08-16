const express = require('express');
const router = express.Router();
const surveyController = require('./survey.controller');
const {getMe} = require('../user/user.controller');
const {authUser, authRole} = require('../tools/auth');
const {ROLE} = require('../tools/permission');

router.get('/:id', authUser, getMe, surveyController.getSurvey);
router.get('/all', authUser, getMe, surveyController.getSurveys);
router.put('/:id', authUser, getMe, surveyController.updateSurvey);
router.post('/create', authUser, getMe, surveyController.createSurvey);

module.exports = router;
