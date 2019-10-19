import {Component} from '@angular/core';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {

  constructor(
    private usersService: UsersService
  ) {
  }

  onSetToInactive(id: number) {
    this.userSetToInactive.emit(id);
  }
}
