import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() noOfUsers;
  public pages: number[];
  public active: number = 1;
  public totalPages: number = 0;
  public usersPerPage: number = 10;

  ngOnInit() {
    this.pages = Array.from(Array(5), (_, x) => x + 1);
  }

  ngOnChanges() {
    this.totalPages = Math.ceil(this.noOfUsers / this.usersPerPage);
    if (this.totalPages > 0) {
      this.pages = Array.from(Array(this.totalPages), (_, x) => x + 1);
    }
  }

  get currentPage() {
    return this.active;
  }

  previousPage() {
    if (this.active <= 1) {
      return;
    } else {
      this.active--;
    }
  }

  nextPage() {
    if (this.active >= this.totalPages) {
      return;
    } else {
      this.active++;
    }
  }

  firstPage() {
    this.active = 1;
  }

  lastPage() {
    this.active = this.totalPages;
  }
}
