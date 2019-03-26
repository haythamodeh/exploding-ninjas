import { Component, OnInit, OnDestroy } from '@angular/core';

import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/common/room';

import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  room: Room;
  name: any;
  private _roomSub: Subscription;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.currentRoom.pipe(
      startWith({ id: '', chat: ''})
    ).subscribe(room => this.room = room);
      this.name = {name: ""};
  }

  ngOnDestroy() {
    this._roomSub.unsubscribe();
  }

  // editRoom() {
  //   this.roomService.editRoom(this.room);
  // }
  addPlayer(){
    this.roomService.addPlayer(this.name);
    this.name = {name: ""};
  }

  getPlayers() {
    this.roomService.getPlayers();
  }

}
