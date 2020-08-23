const express = require('express');
const router = express.Router();
const voteController = require('./vote.controller');
const {authUser} = require('../tools/auth');

router.post('/vote', authUser, voteController.vote);
router.get('/:id', authUser, voteController.getSurvey);
router.get('/all', authUser, voteController.getSurveys);
router.put('/update/:id', authUser, voteController.updateSurvey);
router.put('/publish/:id/:ativate', authUser, voteController.publishSurvey);
router.delete('/delete/:id', authUser, voteController.deleteSurvey);

module.exports = router;
