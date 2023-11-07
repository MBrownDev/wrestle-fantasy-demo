const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    Tag: {
        type: String,
        required: true
    },
    championship: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
});

const UserModel = mongoose.model("roster", UserSchema)
module.exports = UserModel;