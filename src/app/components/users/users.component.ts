import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationPipe } from 'src/app/pipes/pagination.pipe';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(PaginationComponent)
  private paginationComponent!: PaginationComponent;
  public users: User[];
  public noOfUsers: number;
  public pageNumberChange: number;
  public parentCheckBox: boolean = false;
  public searchTextAvailable: boolean;
  public filterUsers: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
        this.noOfUsers = this.users.length;
      },
      error => {
        console.error('Request failed with error', error);
      }
    );
  }

  keyDown() {
    console.log('keydown');
  }

  userItemChanged(userItem: any) {
    this.noOfUsers = userItem.noOfUser;
    this.searchTextAvailable = userItem.searchText && userItem.searchText != '' ? true : false;
    this.filterUsers = userItem.filterUsers;
  }

  checkAllUsers(event): void {
    if (this.searchTextAvailable) {
      this.filterUsers.forEach(user => user.selected = event.target.checked);
      this.noOfUsers = this.filterUsers.length;
    }
    const page = this.paginationComponent.active;
    const start = 10 * (page - 1);
    const end = 10 * (page);
    this.users.slice(start, end).forEach(user => user.selected = event.target.checked);
  }


  editUser(user: User) {
    if (user) {
      const row = document.getElementById(user.id.toString());
      row.focus();
      user.editable = !user.editable;
    }
  }

  updateUser(event: any, user: User, field: string) {
    user[field] = event.target.textContent;
  }

  deleteUser(user: User) {
    if (user) {
      this.users = this.users.filter((item) => item.id !== user.id);
      this.noOfUsers = this.users.length;
    }
  }

  deleteSelectedAll(): void {
    if (this.parentCheckBox && this.searchTextAvailable) {
      const page = this.paginationComponent.active;
      this.users = this.users.filter((item) => !item.hasOwnProperty('selected'));
      if (this.noOfUsers > 10) {
        const deletedUsers = [...this.users.slice(10 * (page - 1), 10 * (page))];
        this.users = this.users.filter((user) => {
          return !deletedUsers.includes(user);
        });
      }
      this.parentCheckBox = !this.parentCheckBox;
      this.noOfUsers = this.filterUsers.length;
    }
    else if (this.parentCheckBox) {
      const page = this.paginationComponent.active;
      const deletedUsers = [...this.users.slice(10 * (page - 1), 10 * (page))];
      this.users = this.users.filter((user) => {
        return !deletedUsers.includes(user);
      });
      this.parentCheckBox = !this.parentCheckBox;
      this.noOfUsers = this.users.length;
    } else {
      this.users = this.users.filter((item) => !item.hasOwnProperty('selected'));
      this.parentCheckBox = !this.parentCheckBox;
      this.noOfUsers = this.users.length;
    }
    //this.users = this.users.slice(10 * (page - 1), 10 * (page)).filter((item) => !item.hasOwnProperty('selected'));
  }
}
