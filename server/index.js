const express = require("express");

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//to listen to events
io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    socket.broadcast.emit("receive-message", data)
  });
});

server.listen(3001, () => {
  console.log("SEVER IS RUNNING");
});
