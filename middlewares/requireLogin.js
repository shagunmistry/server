//Middleware for the stripe route. 
//Next is the function we call when we are 'done' modifying the incoming requests. 
module.exports = (req, res, next) => {

    //If the user is not logged in, send a 401 (unauthorized or not found) error. 
    if (!req.user) {
        return res.status(401).send({ error: "You must log in" });
    }

    //if not, let the user continue on. 
    next();
};