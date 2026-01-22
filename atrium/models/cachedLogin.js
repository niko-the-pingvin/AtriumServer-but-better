const mongoose = require('mongoose');

const CachedLogin = new mongoose.Schema({
    platform: {
        type: Number,
        required: true
    },
    platformId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CachedLogin', CachedLogin);