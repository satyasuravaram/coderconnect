const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    data: {
        type: String,
        minlength: 1,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    readBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;