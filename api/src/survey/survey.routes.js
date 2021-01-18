const express = require('express');
const router = express.Router();
const surveyController = require('./survey.controller');
const {authUser} = require('../tools/auth');

router.get('/public', surveyController.getSurveys);
router.get('/:id', authUser, surveyController.getSurvey);
router.get('/my', authUser, surveyController.getMySurveys);
router.put('/update/:id', authUser, surveyController.updateSurvey);
router.put('/publish/:id/:activate', authUser, surveyController.publishSurvey);
router.post('/create', authUser, surveyController.createSurvey);
router.delete('/delete/:id', authUser, surveyController.deleteSurvey);

module.exports = router;
