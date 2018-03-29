const services  =   require('../services/index');
/*const models    =   require('../models/index').User;*/

/*  Middleware for checking user for logged in.
* */
let isLoggedIn  =   (req, res, next)=> {
    services.token.findToken(req.header('x-auth')).then((doc)=> {
        req["userId"]=doc._doc.user_id;
        next();
    }).catch((err)=> {
        next(err);
    })
}



/*    Middleware authenticating admin   */
let isAdmin     =   (req, res, next)=> {
    services.user.findById(req.userId).then((doc)=> {
        if(!doc || !doc._doc.isAdmin){
            let err = new Error('Authorization Required');
            err.status = 401;
            next(err);
        }
        req['admin'] = doc._doc;
        next();
    }).catch((err)=> {
        next(err);
    });
}



module.exports = {
    isLoggedIn,
    isAdmin
}