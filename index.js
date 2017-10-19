
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
 * Cookie-session = Lets us make use of Cookies inside of our app. Not available out of the box with Express.
 * --We can assign some data to the cookie. Cookie middleware then takes the data out of the cookie and assigns it to req.session prop
 * 
 * After you create a database in mlab.com, set up an user(Administrator) who can access that. Then set up a project at 
 * console.developers.google.com. Create a new API (Google+ for Oauth 2.0); Then create credentials - Oauth Client ID. 
 * 
 * Setting up config variables in Heroku: Go to Settings and then click Reveal Variables and then set it up. 
*/

require('./models/User');
require('./services/passport');
const express = require('express');
//since we are not "returning" anything from passport.js, we just require it. 

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

/**
 * Body-parser middleware wire-up
 * Anytime a post-request or put/patch request comes into our app, the middleware will parse it and assign it to req.body
 */
app.use(bodyParser.json());

/**
 * maxAge: How long we want our cookie to last inside of our session. Ex: 30 days. has to be in miliseconds. 
 * key: key that will be used to encrypt our cookie. So that someone cant fake being someone else.
 */
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//When we require the authRoutes file, it returns a function (bc that's what we export from it) and then the parenthesis
//invokes the function with app. 
authRoutes(app);
billingRoutes(app);

//See if we are on heroku (so that express will server up React routes and production assets)
//FOR Routes like /surveys (or any other route in React Router -- /client/src/index.js)
if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    //Make sure Express serves up production files like main.js or main.css if there are any incoming requests 
    //that Express does not understand and see if a file in here will match up w/ a request, if so send them there. 
    app.use(express.static(path.join(__dirname, 'client/build')));

    //Make sure express will server up index.html file if it doesn't recognize the route bc we are 
    //assuming that the particular route is being handled by React Router. 
    //This is the final attempt at handling the request that couldn't be handled by previous attempts. 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });


}

//Dynamically figure out what port to listen to. This is determined by Heroku and this statement help determine that. 
//If there isn't an environment variable defined by heroku then use 5000. 
const PORT = process.env.PORT || 5001;
app.listen(PORT);
