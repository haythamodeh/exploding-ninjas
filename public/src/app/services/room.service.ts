import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../common/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<string[]>('rooms');
  id = 0;

  constructor(private socket: Socket) { }

  private roomId(): string {
    this.id++;
    return `${this.id}`;
  }

  getRoom(id: string) {
    this.socket.emit('getRoom', id);
  }

  newRoom() {
    this.socket.emit('addRoom', { id: this.roomId(), chat: '' });
  }

  editRoom(room: Room) {
    this.socket.emit('editRoom', room);
  }

}