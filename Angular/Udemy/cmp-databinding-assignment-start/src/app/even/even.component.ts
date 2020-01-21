import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  template: `<p [ngStyle]="{'color': 'red'}">Even - {{ numb }}</p>`
})
export class EvenComponent implements OnInit {
  @Input() numb;

  constructor() { }

  ngOnInit() {
  }

}
