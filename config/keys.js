//Figure out what set of credentials to return 
//Figure out if we are in production or Dev environment and then use submit dev.js file based on that. 

if (process.env.NODE_ENV === 'production') {
    //WE are in production - return the Prod set of keys. 
    module.exports = require('./prod');
} else {
    //We are in Development, return the dev keys 
    //require in the dev file & and export that out.
    module.exports = require('./dev');
}