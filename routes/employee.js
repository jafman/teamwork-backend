const express = require('express');

const router = express.Router();

const controller = require('../controller/employee');

router.post('/', controller.createEmployee);
module.exports = router;
