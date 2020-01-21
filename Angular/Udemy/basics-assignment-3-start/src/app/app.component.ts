import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDisabled = false;
  items = [];
  clicks = 0

  inc(){
    this.clicks++;
    this.items.push(this.clicks)
  }
  
  getColor(val){
    return val > 4 ? 'blue' : 'white';
  }

}
