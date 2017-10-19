const mongoose = require('mongoose');
const { Schema } = mongoose;

//A new mongoose model
//you can assign the type of field it is or what the default value is. 
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});


//Telling mongoose to create a new collection called users. 
//If there is already a collection "users" in database, then it will use the Schema to format it. 
mongoose.model('users', userSchema);