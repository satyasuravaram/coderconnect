const mongoose = require('mongoose');

const ConversationSchema  = new mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    messages : {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Message',
    }
})

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;