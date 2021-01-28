const express = require('express');
const router = express.Router();
const candidateController = require('./candidate.controller');
const {authUser} = require('../tools/auth');

router.post('/', authUser, candidateController.createCandidate);
router.get('/:id', authUser, candidateController.getCandidate);
router.get('/s/:surveyId', authUser, candidateController.getCandidatesWithSurveyId);
router.put('/:id', authUser, candidateController.updateCandidate);
router.delete('/:id', authUser, candidateController.deleteCandidate);

module.exports = router;
