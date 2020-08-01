require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

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
app.use("/mail", require("./routes/mail"));

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
  })

  socket.on("disconnect", () => {
    socket.leave();
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
