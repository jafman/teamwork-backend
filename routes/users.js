const express = require('express');

const router = express.Router();

const controller = require('../controller/users');

router.post('/create-user', controller.createUser);
router.post('/signin', controller.signinUser);
module.exports = router;
