const express = require('express');
const https = require('https');
const path = require('path');
const port = 1337;
const app = express();
const server = app.listen(port, ()=> console.log(`Listening on port ${port}`));
const io = require('socket.io').listen(server);
const rooms = {}; // temporary fake database

app.use(express.static(path.join(__dirname, '/public/dist/public')));

io.on("connection", socket => {
  console.log('Rubber Baby Buggy Bumpers');
  let previousId;

  // change channel of socket
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getRoom", roomId => {
    safeJoin(roomId); // change socket channel
    socket.emit("room", rooms[roomId]);
  });

  socket.on("addRoom", room => {
    rooms[room.id] = room; // add room to fake database
    safeJoin(room.id); // change socket channel
    io.emit("rooms", Object.keys(rooms));
    socket.emit("room", room);
  });

  socket.on("editRoom", room => {
    rooms[room.id] = room;
    socket.to(room.id).emit("room", room);
  });

  io.emit("rooms", Object.keys(rooms));
});
