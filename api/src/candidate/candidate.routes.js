const express = require('express');
const router = express.Router();
const candidateController = require('./candidate.controller');
const {authUser} = require('../tools/auth');

router.post('/', authUser, candidateController.createCandidate);
router.get('/:id', authUser, candidateController.getCandidate);
router.get('s/:surveyId', authUser, candidateController.getCandidatesWithSurveyId);
router.put('/:surveyId', authUser, candidateController.updateCandidate);
router.delete('/:id', authUser, candidateController.deleteCandidate);
router.post('/vote', authUser, candidateController.vote);
router.delete('/vote/:candidateId', authUser, candidateController.deleteCandidateCurrentVotes);
router.delete('/vote/:candidateId/:userId', authUser, candidateController.deleteCurrentVotesOfUserId);


module.exports = router;
