const express = require('express');
const router = express.Router();
const fakeController = require('./fake.controller');
const {authUser} = require('../tools/auth');

router.get('/removeall', authUser, fakeController.removeAll);

module.exports = router;
