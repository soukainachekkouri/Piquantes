const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


modules.exports = mongoose.model('User', userSchema);