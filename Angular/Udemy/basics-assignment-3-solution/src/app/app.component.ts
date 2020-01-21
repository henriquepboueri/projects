import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSecret = false;
  log = [];
  focus = false;
  nameField: ElementRef;

  focusInput(){
    this.nameField.nativeElement.focus();
  }


  onToggleDetails() {
    this.showSecret = !this.showSecret;
    //this.log.push(this.log.length + 1);
    this.log.push(new Date);
  }

  ngOnInit(): void {
    this.nameField.nativeElement.focus("name");
  }
}
