const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  connections: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Connection",
    default: [],
  },
  tutor: {
    type: Boolean,
    required: false,
    default: false,
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  skills: {
    type: Array,
    required: false,
    default: [],
  },
  date: {
    type: String,
    default: Date.now(),
  },
  image: {
    data: Buffer,
    contentType: String,
    name: String,
    desc: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
