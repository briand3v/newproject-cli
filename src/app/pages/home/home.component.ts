import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Photos } from '../../models/photos.model';
import { AuthService } from '../../services/auth.service';

import { PhotoService } from '../../services/photo.service';

import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  photos: Object = [];
  photoInfo: any;
  user: any;
  error: string;



  baseUrl = 'http://localhost:3000';
  feedbackEnabled = false;
  processing = false;
  photo = {
    filename: '',
    description: '',
    // owner: this.value,
  };
  uploader: FileUploader = new FileUploader({
    url: `${this.baseUrl}/upload`,
  });



  constructor(private authService: AuthService,
    private router: Router,
    private photoService: PhotoService,

  ) { }

  ngOnInit() {
    this.getPhotos();
    this.me();
  }

  getPhotos() {
    this.photoService.showAllPhotos().subscribe((data) => this.photos = data);
  }

  logOut() {
    this.authService.logout()
      .subscribe(
      () => {
        // this.user = null,
        this.router.navigate(['/login']);
      },
      (err) => this.error = err
      );
  }
  me() {
    this.authService.me().then((user) => this.user = user);
  }

  submitForm(theForm) {
    console.log(theForm);
    this.feedbackEnabled = true;
    if (theForm.valid) {
      this.processing = true;
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: string) => {
        const fileData = JSON.parse(response);
        this.photo.filename = fileData.filename;
        this.photoService
          .createOnePhoto(this.photo)
          .subscribe(result => {
            this.photoInfo = result,
              console.log(this.photoInfo);
          });
      };
    }
  }

  photoOwner(photo) {
    console.log(photo);
    this.router.navigate(['/photo/owner/', photo.username, photo._id]);
  }

}
