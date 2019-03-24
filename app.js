const express = require('express');
const https = require('https');
const path = require('path');
const port = 1337;
const app = express();
const server = app.listen(port, ()=> console.log(`listening port ${port}`));
const io = require('socket.io').listen(server);
const rooms = {}; // temp fake database

app.use(express.static(path.join(__dirname, '/public/dist/public')));

io.on("connection", socket => {

  console.log('new connection');
  socket.emit('herro', {msg: 'thanks for joining!'});

  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on('balls', data => {
    console.log(data);
  })

  socket.on("getRoom", roomId => {
    safeJoin(roomId);
    socket.emit("room", rooms[roomId]);
  });

  socket.on("addRoom", room => {
    console.log(room);
    rooms[room.id] = room;
    safeJoin(room.id);
    io.emit("rooms", Object.keys(rooms));
    socket.emit("room", room);
  });

  socket.on("editRoom", room => {
    rooms[room.id] = room;
    socket.to(room.id).emit("room", room);
  });

  io.emit("rooms", Object.keys(rooms));
});
