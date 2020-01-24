import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  user: { id: number; name: string };

  ngOnInit() {
    this.users = this.usersService.users;
  }

  users = [];
}
