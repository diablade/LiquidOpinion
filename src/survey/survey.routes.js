const express = require('express');
const router = express.Router();
const surveyController = require('./survey.controller');
const {authUser, authRole} = require('../tools/auth');
const {ROLE} = require('../tools/permission');

router.get('/:id', authUser, surveyController.getSurvey);
router.get('/all', authUser, surveyController.getSurveys);
router.put('/:id', authUser,  surveyController.updateSurvey);
router.post('/create', authUser,  surveyController.createSurvey);
router.delete('/delete', authUser, surveyController.deleteSurvey);

module.exports = router;
