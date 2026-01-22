const mongoose = require('mongoose');

const Gameconfig = new mongoose.Schema({
    Key: {
        type: String,
        required: true
    },
    Value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('GameConfig', Gameconfig);