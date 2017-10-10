// --Production Keys Here.  - This gets committed so that HEROKU can use it. 
//look up our enviornment variables and look up the var called the variable's name.
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY, 
};

