import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

import { User } from '../models/user.model';

const apiUrl = environment.apiUrl;


@Injectable()
export class AuthService {

  // to do observable
  private loaded = false;
  private user: User;
  private userChange: Subject<User | null> = new Subject();
  ///////////////////

  // Observable string stream
  userChange$ = this.userChange.asObservable();

  constructor(private http: Http) { }

  // SetUser
  private setUser(user: User = null) {
    this.loaded = true;
    this.user = user;
    this.userChange.next(user);
  }

  signup(user: User) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + '/signup', user, options)
      .map(res => {
        this.setUser(new User(res.json()));
        return user;
      });
  }

  login(user: User) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + '/login', user, options)
      .map(res => {
        this.setUser(new User(res.json()));
        return user;
      });
  }

  logout() {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + '/logout', {}, options)
      .map(res => {
        this.setUser();
        return null;
      });
  }

  me() {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + '/me', options)
      .toPromise()
      .then(res => {
        const user = new User(res.json());
        this.setUser(user);
        return user;
      })
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
        }
      });
  }
}
