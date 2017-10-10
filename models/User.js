const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});


//Telling mongoose to create a new collection called users. 
//If there is already a collection "users" in database, then it will use the Schema to format it. 
mongoose.model('users', userSchema);