import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() page: EventEmitter<String> = new EventEmitter<String>();

  onSelect(page: string) {
    this.page.emit(page);
    console.log(page);
  }

}
