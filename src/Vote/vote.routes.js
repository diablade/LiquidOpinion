const express = require('express');
const router = express.Router();
const voteController = require('./vote.controller');
const {authUser} = require('../tools/auth');

router.post('/vote', authUser, voteController.vote);
// router.get('/candidate/:id', authUser, voteController.getRangeDateVotesByCandidateId);
router.delete('/delete/candidate/:id', authUser, voteController.deleteAllVotesByCandidateId);
router.delete('/delete/user/:id', authUser, voteController.deleteAllVotesByUserId);

module.exports = router;
