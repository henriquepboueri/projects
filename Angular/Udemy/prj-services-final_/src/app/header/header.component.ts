import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dsService: DataStorageService){}

  onSaveData(){
    this.dsService.storeRecipes();
  }

  onFetchData(){
    this.dsService.fetchRecipes();
  }

}
