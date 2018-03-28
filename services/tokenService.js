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

module.exports = {
    addToken,
}