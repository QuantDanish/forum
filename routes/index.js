const router    =   require('express').Router();
const questionRoute =   require('./questionRoute');
const answer    =   require('./answerRoute');
const admin     =   require('./admin');
const users     =   require('./users');
const auth      =   require('./auth-route');


/* GET home page. */
router.use('/ques', questionRoute);
router.use('/answer', answer);
router.use('/admin', admin);
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;
