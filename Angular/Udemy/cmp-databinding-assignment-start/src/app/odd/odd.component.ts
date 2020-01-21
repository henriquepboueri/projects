import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  template: `<p [ngStyle]="{'color': 'blue'}">odd - {{ numb }}</p>`
})
export class OddComponent implements OnInit {
  @Input() numb;

  constructor() { }

  ngOnInit() {
  }

}
