import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser, IUsers } from '../models/users';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  usersDetailsObs$ = new Subject<IUser>();

  getUserData(): Observable<IUsers> {
    const userDataApiUrl = env.apiUrl + 'Demos/json-dummy-data/64KB.json';
    return this.http.get<IUsers>(userDataApiUrl);
  }
}
