const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['normal', 'premium'], default: 'normal' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;