require("dotenv/config");
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("realtime-update", () => {
    console.log("Invalidating query");
    socket.broadcast.emit("realtime-update-client");
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});


server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
