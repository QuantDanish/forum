const router    =   require('express').Router();
const passport  =   require('passport');
const passportSetup = require('../config/passport-setup');


router.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}));


// callback url for google. user will be given response from here after authentication.
router.get('/google/redirect',
    passport.authenticate('google'),
    (req, res, next)=> {
        res.send({message: `${req.body.username}you have successfully logged in`});
});

module.exports =  router;