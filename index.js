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
 */
app.get('/', (req, res) => {
    res.send({
        hi: 'there'
    });
});

//Dynamically figure out what port to listen to. This is determined by Heroku and this statement help determine that. 
//If there isn't an environment variable defined by heroku then use 5000. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);