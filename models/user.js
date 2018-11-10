const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    profile_pic: String
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
