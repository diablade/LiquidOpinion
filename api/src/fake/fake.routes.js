const express = require('express');
const router = express.Router();
const fakeController = require('./fake.controller');
const {authUser} = require('../tools/auth');

router.get('/fakeall', fakeController.fakeAll);

module.exports = router;
