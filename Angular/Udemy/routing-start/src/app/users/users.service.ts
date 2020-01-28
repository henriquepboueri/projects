import { Observable } from "rxjs";

class User {
  id: number;
  name: string;
}

export class UsersService {
  observable = new Observable<User[]>(obj => {
    obj.next(this.users);
  });

  users: User[] = [
    {
      id: 1,
      name: "Max"
    },
    {
      id: 2,
      name: "Anna"
    },
    {
      id: 3,
      name: "Chris"
    }
  ];

  clearUsers() {
    this.users.splice(0, 1);
  }

  ngOnInit() {}
}
