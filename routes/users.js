const router = require('express').Router();
const services  =   require('../services/index');




/* GET users listing. */
router.get('/', function(req, res, next) {
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

module.exports = router;
