
const passport  =   require('passport');
const GoogleStrategy  =  require('passport-google-oauth20');


const keys  =   require('./keys.js');
const services  = require('../services/index');


//  Google Open Authentication 2.0-----------------------------------------
passport.use( new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=> {

        // find user in db
        services.user.findByGoogleId(profile.id)
            .then((doc)=> {

                if(doc) {
                    // user found in db.
                    services.token.addToken(accessToken, doc._id)
                        .then((doc)=> {
                            // new token added.
                            done(null, profile);
                        }, (err)=> {
                            console.log("Token Write Error: ",err);
                            done(err);
                        });
                } else {
                    // user found in db. Adding new User in db.
                    services.user.addUser(profile)
                        .then( (doc)=> {
                            services.token.addToken(accessToken, doc._id)
                                .then( (doc)=> {
                                    done(null, profile);
                                },(err)=> {
                                    console.log("Token Write Error (New User): ",err);
                                    done(err);
                                })
                        }, (err)=> {
                            console.log("User Write Error: ",err);
                            done(err);
                        });
                }
            })
            .catch((err)=> {
                console.log("Find By Google Id Error: ",err);
                done(err);
            });

}));




// Facebook Open Authentication 2.0 -------- ------- ----------- -----------


// Local Authentication
