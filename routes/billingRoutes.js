/**
 * File where all the billing Routes will be handled 
 * E.g: after the user gets back from the Stripe payments. 
 */
const keys = require('../config/keys');
//Installed stripe so we can use the inbuilt stripe methods. eg. charge a user 
//The second parenthesis is required by stripe for authorization. 
const stripe = require('stripe')(keys.stripeSecretKey);
//Middleware for handling api/stire login authentication requirement.
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

    //Route handler: watch for the post request that is made to the api/stripe
    //Anytime someone makes a post request, Express runs the requireLogin 
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //if passport didn't find a user that was referenced inside the cookie included in the request.
        //Then end the request 
        if (!req.user) {
            //Sets the HTTP status code of the request to 401 (unauthorized or not found)
            return res.status(401).send({
                error: 'You must log in'
            });
        }
        //Confirming how much we want t charge the user. 
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            //the id from the token property that just got passed in from req.body 
            source: req.body.id
        });

        //Our user model
        //To update the number of credits the user has and then save(function we built) the user
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};
