import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}
  user: { id: number; name: string };

  ngOnInit() {
    this.usersService.observable.subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  users = [];
}
