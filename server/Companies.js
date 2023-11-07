const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
});

const UserModel = mongoose.model("roster", UserSchema)
module.exports = UserModel;