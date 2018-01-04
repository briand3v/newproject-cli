import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs/Observable';

const apiUrl = environment.apiUrl;

@Injectable()
export class PhotoService {


  constructor(private http: Http) { }

  showAllPhotos() {
    const options = new RequestOptions();
    options.withCredentials = true;

    return this.http.get(apiUrl + '/photos', options).map((res: Response) => res.json());
  }
  showAllPhotosByOwner() {
    const options = new RequestOptions();
    options.withCredentials = true;

    return this.http.get(apiUrl + '/photos/owner', options).map((res: Response) => res.json());
  }

  showAllPhotosByVisitor(idVisitor) {
    return this.http.get(apiUrl + `/photos/${idVisitor}`).map((res: Response) => res.json());
  }

  showPhotoByOwner(username, photoId) {
    return this.http.get(apiUrl + `/photo/owner/${username}/${photoId}`).map((res: Response) =>
      res.json());
  }

  userDetails() {
    const options = new RequestOptions();
    options.withCredentials = true;

    return this.http.get(apiUrl + '/user/:id', options).map((res: Response) => res.json());
  }

  createOnePhoto(formData) {
    const options = new RequestOptions();
    options.withCredentials = true;

    return this.http
      .post(apiUrl + '/user/upload', formData, options)
      .map((res: Response) => res.json());
  }

  deletePhoto(username, photoId) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.delete(apiUrl + `/delete/photo/owner/${username}/${photoId}`, options)
      .toPromise()
      .then((res: Response) => res.json());
  }

  addComment(photoId, comment) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + `/photo/owner/${photoId}/addComment`, comment, options)
      .map((res: Response) => res.json());
  }

  showComments(photoId) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + `/photo/owner/${photoId}`, options)
      .map((res: Response) => res.json());
  }

}
