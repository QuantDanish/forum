const models     =   require('../models/index');


// add new token with client id into token collection.
let addToken    =   (token, userId)=> {
    return new Promise( (resolve, reject)=> {
        let newToken    =   new models.Token({
            token: token,
            user_id: userId
        });

        newToken.save().then( (doc)=>{
            resolve(doc);
        }, (err)=> {
            reject(err);
        });
    });
}


/*  search for token document in db     */
let findToken   =   (userToken)=> {
    return new Promise((resolve, reject)=> {
        models.Token.findOne({
            token: userToken
        }).then((doc)=> {
            if(doc) return resolve(doc);

            let err     =   new Error('Authentication required');
            err.status = 401;
            reject( err);
        }).catch((err)=> {
            return reject(err);
        })
    });
}


module.exports = {
    addToken,
    findToken
}