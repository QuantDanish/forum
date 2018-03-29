const router = require('express').Router();
const services  =   require('../services/index');
const login= require('../middleware/index').login;
const passport  =   require('passport');
const passportSetup = require('../config/passport-setup');


/* GET users listing. */
router.get('/',function(req, res, next) {
  res.send('respond with a resource');
});

/* POST sign up for user */
router.post('/', (req, res, next)=> {
    services.user.findAndAdd(req.body)
        .then((msg)=> {
            res.send(msg);
        }).catch( (err)=> {
            next(err);
        });
});
/*  POST login  */
router.post('/login', passport.authenticate('local', {session: false}),
    (req, res, next)=> {
        if(req.authInfo.login) {
            res.header('x-auth', req.authInfo.token)
        }
        res.send(req.authInfo.message);
    }
);


/*  POST logout
*/
router.post('/logout', (req, res, next)=> {
    services.user.logout(req.header('x-auth')).then((doc)=> {
        res.send({message: `you have been logged out.`});
    }).catch((err)=> {
        next(err);
    })
});


module.exports = router;
