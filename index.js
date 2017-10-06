const express = require('express');
const app = express();

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
 * Heroku app: https://safe-citadel-50116.herokuapp.com/
 * Heroku Git Deployment Repository: https://git.heroku.com/safe-citadel-50116.git
 * 
 */
app.get('/', (req, res) => {
    res.send({
        bye: 'buddy'
    });
});

//Dynamically figure out what port to listen to. This is determined by Heroku and this statement help determine that. 
//If there isn't an environment variable defined by heroku then use 5000. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);