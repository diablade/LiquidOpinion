const express = require('express');
const router = express.Router();
const surveyController = require('./survey.controller');
const {authUser} = require('../tools/auth');

router.get('/:id', authUser, surveyController.getSurvey);
router.get('/all', authUser, surveyController.getSurveys);
router.put('/update/:id', authUser,  surveyController.updateSurvey);
router.put('/publish/:id/:ativate', authUser,  surveyController.publishSurvey);
router.post('/create', authUser,  surveyController.createSurvey);
router.delete('/delete/:id', authUser, surveyController.deleteSurvey);

module.exports = router;
