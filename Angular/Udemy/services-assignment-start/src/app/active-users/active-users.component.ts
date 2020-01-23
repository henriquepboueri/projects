import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { UsersService } from "../users.service";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.css"]
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.users = this.usersService.activeUsers;
  }

  onSetToInactive(i) {
    this.usersService.onSetToInactive(i);
  }
}
