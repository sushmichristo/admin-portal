import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';

import { UsersComponent } from './users.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent,
        PaginationPipe,
        SearchFilterPipe],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        UserService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers', () => {
    spyOn(component, 'getUsers');
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.getUsers).toHaveBeenCalledTimes(1);
  });
});
