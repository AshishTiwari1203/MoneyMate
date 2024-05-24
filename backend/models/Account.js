const mongoose = require('mongoose');

// Define the schema for the Account model
const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  balance: {
    type: Number,
    default: 0 
  }
});

// Create the Account model using the schema
const Account = mongoose.model('Account', accountSchema);

module.exports = Account