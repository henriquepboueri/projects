import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers : number[] = []
  evenNumbers : number[] = []
  onTicks(value) {
    (value % 2 == 0) ? this.oddNumbers.push(value) : this.evenNumbers.push(value);
  }
}
