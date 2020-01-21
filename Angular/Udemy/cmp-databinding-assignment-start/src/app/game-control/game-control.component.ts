import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  ticks: number = 0;
  ref;
  @Output() evento = new EventEmitter<number>();

  onStartGame() {
    this.ref = setInterval(() => {
      this.evento.emit(this.ticks++)
    }, 1000);

  }
  onStopGame() {
    clearInterval(this.ref);
    //this.ticks = 0;
  }

  constructor() { }


  ngOnInit() {
  }

}
