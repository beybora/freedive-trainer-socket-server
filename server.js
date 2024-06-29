const express = require("express");
const app = express();
app.use(express.static("public"));
const expressServer = app.listen(4000);

const socketio = require("socket.io");
const io = socketio(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "has joined our server!");

  socket.emit("welcome", ["hello", "world", "friends", "we are connected!"]);

  socket.on("thanks", (data) => {
    console.log("message from the client", data);
  });
});
