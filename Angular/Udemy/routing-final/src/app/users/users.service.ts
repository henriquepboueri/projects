import { Observable } from 'rxjs/Observable';
import { from, of } from 'rxjs';

interface Users {
    id: number;
    name: string;
}
export class UsersService {
    users: Users[] = [{
        id: 1,
        name: 'Max'
    },
    {
        id: 2,
        name: 'Anna'
    },
    {
        id: 3,
        name: 'Chris'
    }];

    getUsers()//: Observable<Users> {
    {
        return of(this.users);
    }

    onAddUser(name: string) {
        console.log(name);
        const maxId = ++this.users.reduce((p, c) => p.id > c.id ? p : c)['id'];
        this.users.push({id: maxId, name: name});
    }
}