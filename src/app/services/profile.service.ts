import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class ProfileService {


  constructor(private http: Http) { }

  showAllPhotos() {
    return this.http.get(apiUrl + '/photos').map((res: Response) => res.json());
  }

  userDetails() {
    return this.http.get(apiUrl + '/user/:id').map((res: Response) => res.json());
  }

  createOnePhoto(formData, id) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http
      .post(apiUrl + `/user/${id}`, formData, options)
      .map((res: Response) => res.json());
  }

}
