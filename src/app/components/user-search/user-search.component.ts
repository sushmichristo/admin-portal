import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {

  @Input() users: User[];
  public noOfUsers: number;
  public searchText: string;
  @Output() userItemChanged = new EventEmitter<any>();

  ngOnInit(): void {
    this.searchText = '';
  }

  onSearchChange(): void {
    this.searchText = this.searchText.toLowerCase();
    const filterUsers = this.users.filter(user => user.name.toLocaleLowerCase().includes(this.searchText)
      || user.email.toLowerCase().includes(this.searchText)
      || user.role.toLowerCase().includes(this.searchText));
    this.noOfUsers = filterUsers.length;
    this.userItemChanged.emit({ noOfUser: this.noOfUsers, searchText: this.searchText, filterUsers });
  }
}
