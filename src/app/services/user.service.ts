import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUserId(id) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + `/user/${id}`, options)
      .map((res: Response) => res.json());
  }

  updateUser(id, data) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + `/user/${id}/edit`, data, options)
      .map((res: Response) => res.json());
  }

  getImgProfile(id, userProfile) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + `/setProfile/user/${id}`, userProfile, options)
      .map((res: Response) => res.json());
  }




}
