const router    =   require('express').Router();
const authorize=   require('../middleware/index').authorize;
const admin     =   require('../services/index').admin;

// check for logged in and admin middleware
router.use(authorize);

/*  POST request to update department   */
router.post('/department',(req, res, next)=> {
    admin.addNewDepartment(req.body.name, req.body.email_id)
        .then((message)=> {
            res.send(message);
    }).catch((err)=> {
        next(err);
    });
});

/* POST block an existing user */
router.post('/user', (req, res, next)=> {
    admin.blockUser(req.body.username).then((user)=> {
        res.send(user);
    }).catch((err)=> {
        next(err);
    })
});

module.exports = router;