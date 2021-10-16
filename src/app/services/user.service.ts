import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'; // URL to users api

  constructor(private http: HttpClient) { }

  /**
   * Get users from api
   *
   * @returns User
   */
  getUsers(): Observable<any> {
    return this.http.get(this.baseURL).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError<User[]>('searchUseres', []))
    );
  }

  searchUsers(term: string, users: User[]): Observable<User[]> {
    if (!term.trim()) {
      return of(users);
    }
    return of(users.filter(user => user.name.includes(term) || user.name.includes(term) || user.name.includes(term)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
