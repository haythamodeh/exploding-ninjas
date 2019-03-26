const express = require('express');
const path = require('path');
const port = 1337;
const app = express();
const server = app.listen(port, ()=> console.log(`Listening on port ${port}`));
const io = require('socket.io').listen(server);
const rooms = {}; // temporary fake database

let deck = ["one", "two", "three"];

players = [];

app.use(express.static(path.join(__dirname, '/public/dist/public')));

io.on("connection", socket => {
  
  console.log('Rubber Baby Buggy Bumpers');
  
  

  // socket.on("editRoom", room => {
  //   rooms[room.id] = room;
  //   // console.log(room);
  //   // socket.to(room.id).emit("room", room);
  //   io.emit("room", room);
  // });

  socket.on("newplayer", data => {
    player = {
      id: socket.id,
      name: data.name,
      hand: [],
      isTurn: false,
      isDead: false
    }
    players.push(player);
    io.emit("newplayercreated", data);
  })

  socket.on("gotplayer", data => {
    data = players;
    console.log("server got all players", data);
    socket.emit("gettingplayers", players);
  });


  socket.on('disconnect', function(){
    console.log("deleted user");
    players = [];

})
});

