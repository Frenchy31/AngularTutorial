import { User } from '../models/User.model';
import { Subject } from 'rxjs';

export class UserService {
  private users: User[] = [
    new User( 'Aubin', 'Puyoou', 'aubin.puyoou@gmail.com', 'Whisky', ['Coding', 'Boxing', 'Play the guitar'])
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
