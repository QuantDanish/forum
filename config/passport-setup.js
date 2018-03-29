
const passport  =   require('passport');
const GoogleStrategy    =   require('passport-google-oauth20');
const LocalStrategy     =   require('passport-local').Strategy;
const uuidv1    =   require('uuid/v1');


const keys  =   require('./keys.js');
const services  = require('../services/index');

/*  ===========     Local Stategy =====================
* */
passport.use( new LocalStrategy(( username, password, done)=> {
    services.user.find({username, password})
        .then( (user)=> {
            if(!user){
                // user does not exits.
                done(null, false, {
                    login: false,
                    message: `Either Username or password is incorrect.`
                });
            } else {
                // user found in db. Generating token to save in DB.
                services.token.addToken(uuidv1(), user._id)
                    .then( (doc)=> {

                        done(null, doc,{
                            login: true,
                            message: `${user.username} have logged in successfully.`,
                            token: doc.token
                        });

                    },(err)=> {
                        console.log("Token Write Error (New User): ",err);
                        done(null, user, {
                            login: false,
                            message: `Token Generation Error`
                        });
                    })

            }

        })
        .catch( (err)=> {
            console.log('Error in user searching: ',err.message);
            done(err);
        })
}));



//  Google Open Authentication 2.0-----------------------------------------
passport.use( new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=> {

        // find user in db
        services.user.find({google_id: profile.id})
            .then((doc)=> {

                if(doc) {
                    // user found in db.
                    services.token.addToken(uuidv1(), doc._id)
                        .then((doc)=> {
                            // new token added.
                            done(null, doc, doc);
                        }, (err)=> {
                            console.log("Token Write Error: ",err);
                            done(err);
                        });
                } else {
                    // user found in db. Adding new User in db.
                    services.user.addGoogleUser(profile)
                        .then( (doc)=> {
                            services.token.addToken(uuidv1(), doc._id)
                                .then( (doc)=> {
                                    done(null, doc, doc);
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
