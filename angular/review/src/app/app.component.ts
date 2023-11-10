import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'review';
  range = 0;


  onChangeHandler(event: Event) {
    console.log((event as InputEvent).data);
  }
}
