const models    =   require('../models/index');

let addUser = (profile)=> {
    return new Promise( (resolve, reject)=> {
        let newUser     =   new models.User({
            google_id: profile.id,
            username: profile.displayName,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email_id: profile.emails[0].value,
            photo: profile.photos[0].value,
        });


        newUser.save().then(( doc)=> {
            resolve(doc);
        }).catch((err)=> {
            reject(err);
        });
    });
}

let findByGoogleId = (googleId)=> {
    return new Promise((resolve, reject)=> {
        models.User.find({google_id: googleId})
            .then((doc)=> {
                resolve(doc);
            }, (err)=> {
                reject(err);
            })
    });
}


module.exports = {
    addUser,
    findByGoogleId
}