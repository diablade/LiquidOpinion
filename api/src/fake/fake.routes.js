const express = require('express');
const router = express.Router();
const fakeController = require('./fake.controller');
const {authUser} = require('../tools/auth');

router.get('/fakeall', fakeController.fakeAll);
router.get('/removeall', fakeController.removeAll);

module.exports = router;
