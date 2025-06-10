const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, auto: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    status: {type: String},
});

module.exports = mongoose.model('User', userSchema);