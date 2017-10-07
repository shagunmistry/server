
/**
 * This whole segment right here would be called the route handleer.
 * .Get = Get info. 
 * .post = Send info
 * .put = update all the properties of something
 * .delete = delete something
 * .patch = update one or two properties of something. 
 * 
 * req = the object representing the incoming object. 
 * res = the outgoing response. (result)
 * res.send sends some JSON back to whoever made the request.
 * 
 * //To deploy app to Heroku, commit code to git. Use commands:
 * - Heroku Create
 * - git remote add <name-of-app> <--.git link created by Heroku Create-->
 * - git push <name-of-app> master
 * - heroku open (opens the app in the browser if everything went right);
 * 
 * //To update after creation 
 * - git add . 
 * - git commit -m "message"
 * - git push <name> master
 * - heroku open (optional)
 * 
 * Heroku app: https://safe-citadel-50116.herokuapp.com/
 * Heroku Git Deployment Repository: https://git.heroku.com/safe-citadel-50116.git
 * 
 * History:: app.get('/', (req, res) => { res.send({ bye: 'buddy'  });   });
 */

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//get the clientID and clientSecret of Google
const keys = require('./config/keys');

const app = express();

/** Create new instance of GoogleStrategy and pass in config on how to authenticate users inside passport.
* Passport.use == lets passport know which specific strategy to use.

    The callbackURL is used to determine that when the user comes back, they are led to the success page. 
*/
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            console.log('access Token', accessToken);
            console.log('refresh Token', refreshToken);
            console.log('profile: ', profile);

        }
    )
);

//Add route handler so the user can get directed to the google auth
//Scope specified to google what access we want to have to the user's data. 
//passport.authentication('name') is to help passport determine which strategy to use --> GoogleStrategy
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//get the code from the URL that gives us access to the user's data. 
app.get('/auth/google/callback', passport.authenticate('google'));

//Dynamically figure out what port to listen to. This is determined by Heroku and this statement help determine that. 
//If there isn't an environment variable defined by heroku then use 5000. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);



//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_
//uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&
//client_id=813533912632-b33a77favgi2jchls1dvafaedr2iti9j.apps.googleusercontent.com