
const passport  =   require('passport');
const GoogleStrategy  =   require('passport-google-oauth20');


const keys  =   require('./keys.js');



//  Google Open Authentication 2.0-----------------------------------------
passport.use( new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=> {
        console.log(accessToken,refreshToken, profile);
        done(null, profile);
}));




// Facebook Open Authentication 2.0 -------- ------- ----------- -----------


// Local Authentication
