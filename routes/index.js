var express = require('express');
var router = express.Router();
var questionRoute = require('./questionRoute');

/* GET home page. */

router.use('/ques',questionRoute);
module.exports = router;
