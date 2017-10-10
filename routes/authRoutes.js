const passport = require('passport');

//Add route handler so the user can get directed to the google auth
//Scope specified to google what access we want to have to the user's data. 
//passport.authentication('name') is to help passport determine which strategy to use --> GoogleStrategy

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    //get the code from the URL that gives us access to the user's data. 
    app.get('/auth/google/callback', passport.authenticate('google'));

    //req = incoming res = outgoing response. 
    app.get('/api/cur_user', (req, res) => {
        res.send(req.user);
    });

    //to log out the user ..Passport automatically attached logout() to the req .
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
};