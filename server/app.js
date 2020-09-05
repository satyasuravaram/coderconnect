const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const enforce = require('express-sslify');

app.use(cors());
app.use(express.json());

app.use(enforce.HTTPS({ trustProtoHeader: true })); //forces https

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
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
app.use("/mail", require("./routes/mail"));
app.use("/auth", require("./routes/auth"));

io.on("connection", (socket) => {
  console.log(`New User Connected ${socket.id}`);

  socket.on("join", (data) => {
    const room = data.connectid;
    socket.join(room);
    console.log("Joined");
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("newMessage", { message: data.message });
  });

  socket.on("statusReady", (data) => {
    console.log("User ready");
    console.log(data.room);
    socket.broadcast.to(data.room).emit("statusReady", data);
  });

  socket.on("setOtherUser", (data) => {
    console.log(data);
    io.to(data.room).emit("otherUserID", data.otherUserID);
  })

  socket.on("callUser", (data) => {
    socket.broadcast.to(data.room).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    socket.broadcast.to(data.room).emit("callAccepted", data.signal);
  });

  socket.on("endCall", (data) => {
    io.to(data.room).emit("onCallEnd");
  });

  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("value", (data) => {
    socket.broadcast.to(data.room).emit("new-value", data);
  });

  socket.on("change-mode", (data) => {
    socket.broadcast.to(data.room).emit("new-mode", data);
  });

  socket.on("endSession", (data) => {
    io.to(data.room).emit("endSession", data);
  });

  socket.on("disconnect", () => {
    socket.leave();
    console.log("User disconnected");
  });
});

//Serve Static Assets
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
server.listen(app.get(port), () => {
  console.log(`Server running on port ${port}`);
});
