const express = require("express");
const { createServer } = require("http");
const serverless = require("serverless-http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

module.exports = app;
module.exports.handler = serverless(app);
