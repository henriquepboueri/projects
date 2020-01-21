import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  amount: number[] = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
  }

}
