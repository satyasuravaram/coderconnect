require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const Connection = require("./models/Connection");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

//Connect to mongoose
const mongo_URI = process.env.MONGO_URI;

mongoose
  .connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//Routes
app.use("/users", require("./routes/users"));
app.use("/messages", require("./routes/messages"));

io.on("connection", (socket) => {
  console.log(`New User Connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
