const mongoose = require('mongoose')

//User Schema created
const UserSchema = mongoose.Schema({
    username :{
        type: String,
        required : true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password :{
        type: String,
        required: true,
        minLength: 6     
    },
    FirstName :{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    LastName :{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

//Creating the model by name "User" and Exporting it
const User = mongoose.model('User', UserSchema);

module.exports = User;


