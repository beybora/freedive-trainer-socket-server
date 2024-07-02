const express = require("express");
const http = require("http");
const { createServer } = require("http"); // Correct import for createServer
const { Server } = require("socket.io");

const app = express();
const server = createServer(app); // Create HTTP server using createServer
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("realtime-update", (data) => {
    console.log("Invalidating query");
    socket.broadcast.emit("realtime-update-client");
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

app.use(express.static("public"));

server.listen(PORT, () => {
  console.log("Server running on port 4000");
});
