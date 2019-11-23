const express = require('express');

const router = express.Router();

const controller = require('../controller/users');

router.post('/', controller.createUser);
module.exports = router;
