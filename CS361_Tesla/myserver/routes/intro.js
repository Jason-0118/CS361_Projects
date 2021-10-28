var express = require('express');
var router = express.Router();
var introControllers = require('../controller/introControllers');

router.get('/', introControllers.get_introList);

module.exports = router;
