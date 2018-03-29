var express = require('express');
var router = express.Router();

var questionRoute = require('./questionRoute');


var answer= require('./answerRoute');

/* GET home page. */


router.use('/ques',questionRoute);

router.use('/answer',answer);


module.exports = router;
