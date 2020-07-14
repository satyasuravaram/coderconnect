const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
        required: true,
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    }
});

const Connection = mongoose.model('Connection', ConnectionSchema);
module.exports = Connection;