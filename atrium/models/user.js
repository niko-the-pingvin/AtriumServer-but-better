const mongoose = require('mongoose');

const user = new mongoose.Schema({
    public: {
        username: {
            type: String,
            required: true,
            minlength: 3,
        },
        displayName: {
            type: String,
            required: true,
            minlength: 3,
        },
        profilePicture: {
            type: String,
            required: true,
            minlength: 0,
        },
        isJunior: {
            type: Boolean,
            required: true,
        },
        creationDate: {
            type: String,
            required: true,
        },
    },
    private: {
        roles: {
            type: Array,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        verifiedEmail: {
            type: Boolean,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        }
    }
});

module.exports = mongoose.model("User", user);