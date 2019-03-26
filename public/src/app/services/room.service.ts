import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../common/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  currentRoom = this.socket.fromEvent<Room>('room');
  players: any;

  constructor(private socket: Socket) { 

    this.socket.on("gettingplayers", data => {
      console.log("client got all players",data);
    });
    this.socket.on("newplayercreated", data => {
      console.log("new player created",data);
    });
  }
  
  // editRoom(room: Room) {
    //   return this.socket.emit('editRoom', room);
    // }
    
  addPlayer(newplayer: string) {
    this.socket.emit("newplayer", newplayer);
  }  
  getPlayers(){
    this.socket.emit("gotplayer", this.players);
  }

}
