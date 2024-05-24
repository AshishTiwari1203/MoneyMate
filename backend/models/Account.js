const mongoose = require('mongoose')

//User Schema created
const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

//Creating the model by name "Account" and Exporting it
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;


