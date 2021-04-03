const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    dni: String,
    agree: Boolean
});

module.exports = mongoose.model('User', userSchema)