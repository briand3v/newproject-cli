import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUserId(id) {
    return this.http.get(apiUrl + `/user/${id}`)
      .map((res: Response) => res.json());
  }

  updateUser(id, data) {
    return this.http.post(apiUrl + `/user/${id}/edit`, data)
      .map((res: Response) => res.json());
  }




}
