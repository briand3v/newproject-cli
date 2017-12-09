import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/observable';



import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  showAllPhotos() {
    return this.http.get(apiUrl + '/photos')
      .toPromise()
      .then((res: Response) => res.json());
  }

}
