import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onAddUser(name: string){
    this.usersService.onAddUser(name);
  }

}
