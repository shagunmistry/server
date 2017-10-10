const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//one argument means that we are trying to fetch something from it. Two mean we're sending something to it. 
const User = mongoose.model('users');

/**
 * call this to get the id that uniquely identifies a user based on their id in MongoDB (not GoolgeID);
 * Reason: In case we make use of multiple auth clients, then we can use this id instead of from each client(FB, Google, Twitter..)
 * Put this information into a cookie 
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * Reason: To turn a unique id into a user. Turn that cookie into information that we can use. 
 */
passport.deserializeUser((id, done) =>{
    //Get the user and return his information. 
    User.findById(id).then( user => {
        done(null, user);
    });
});


/** Create new instance of GoogleStrategy and pass in config on how to authenticate users inside passport.
* Passport.use == lets passport know which specific strategy to use. The callbackURL is used to determine that when the user comes back, they are led to the success page. 
*/
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            //Check if a user already exists by comparing GoogleIds 
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    /**
                     * if the user already exists with the given profile ID.
                     * This tells passport that we have finished creating the user and the authentication process is done.
                     * null tells that there's no err here. The second argument is the user record. This tells passport what 
                     * user we found. 
                     */
                    done(null, existingUser);
                } else {
                    /**
                     * We don't so create a new user. This creates a new model instance. 
                     * the .save takes this record and saves it to the instance 
                     */
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });

        }
    )
);