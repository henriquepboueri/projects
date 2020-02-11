import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import { DataStorageService } from "./../shared/data-storage.service";
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isLoggedIn = false;

  constructor(
    private dsService: DataStorageService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription = this.authservice.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
