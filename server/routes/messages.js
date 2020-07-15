const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
//Model Imports
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Connection = require("../models/Connection");

//New Connection
router.post("/newConnection", async function (req, res, next) {
  console.log("hi1")
  try {
    const student = await User.findById(req.body.currentUserId);
    const tutor = await User.findById(req.body.tutorId);
    
console.log("1")
    const newConversation = new Conversation({
      messages: [],
      users: [student, tutor],
    });
    console.log("2")
    const conversation = await newConversation.save();
    console.log("3")

    const connectionModel = await new Connection({
      userId: req.body.tutorId,
      conversation: conversation,
    });
    console.log("4")

    const connection = await connectionModel.save();
    console.log("5")

    const tutorConnectionModel = await new Connection({
      userId: req.body.currentUserId,
      conversation: conversation,
    });
    console.log("6")

    const tutorConnection = await tutorConnectionModel.save();
    console.log("7")

    student.connections = [...student.connections, connection._id];
    console.log("student id works")
    tutor.connections = [...tutor.connections, tutorConnection._id];
    console.log("8")
    await tutor.save();
    console.log("9")
    const newStudent = await student.save();
    console.log("10")
    res.status(200).json(newStudent);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Find Connection
router.get("/", async function (req, res, next) {
  try {
    const user = await User.findOne({ username: req.query.username });
    const connection = await Connection.findById(req.query.connectionid);
    res.status(200).json(connection);
  } catch (err) {
    res.status(400).json(connection);
  }
});

//Load All Connections for One User
router.get("/loadAllConnections", async function (req, res, next) {
  try {
    const user = await User.findOne({ username: req.query.username });
    let connections = [];

    if (!user.data.connections.length) {
      return res.status(400).json("User does not have any connections.");
    }

    user.data.connections.map(async (connection, i) => {
      try {
        const foundConnection = await Connection.findById(connection);
        const newUser = await User.findById(foundConnection.userId);
        if (user.data.connections.length >= i + 1) {
          connections.push({
            user: newUser,
            conversation: foundConnection.conversation,
          });
          return res.status(200).json(connections);
        } else {
          connections.push({
            user: newUser,
            conversation: foundConnection.conversation,
          });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get All Messages for one Conversation
router.get("/:id", async function (req, res, next) {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const allMessages = [];
    if (!conversation.messages) {
      res.json([]);
    }
    conversation.messages &&
      conversation.messages.map(async (msgId, i) => {
        const message = await Message.findById(msgId);
        allMessages.push(message);

        if (conversation.messages.length >= i + 1) return res.json(allMessages);
      });
    return res.json(allMessages);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Send Message
router.post("/:id", async function (req, res, next) {
  try {
    //Create and Save Message
    const message = await new Message(req.body);
    await message.save();

    //Add Message to Conversation
    const conversation = await Conversation.findById(req.params.id);
    conversation.messages = [...conversation.messages, message._id];
    await conversation.save();

    res.status(200).json(conversation);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
