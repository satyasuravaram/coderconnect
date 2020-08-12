const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    data: {
        type: String,
        required: false
    }
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;