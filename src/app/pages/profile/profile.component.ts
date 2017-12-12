import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FileUploader } from 'ng2-file-upload';

import { error } from 'util';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private sub: any;
  value: any;
  photos: Object = [];
  photoInfo: any;
  details: Object = [];
  dataUser: any;
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

  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    // private params: Params
  ) { }

  ngOnInit() {
    this.idUser();
    this.getUserInfo();
    console.log(this.photos);
  }


  idUser() {
    this.route.params.subscribe(params => {
      this.value = params['id']; // --> Name must match wanted parameter
      console.log(this.value);
    });
  }


  getUserInfo() {

    this.userService.getUserId(this.value).subscribe((data) => this.dataUser = data);
  }

  editClick() {
    this.router.navigate(['/user/' + this.dataUser.username + '/edit']);
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



  logOut() {
    this.authService.logout()
      .subscribe(
      () => {
        this.user = null,
          this.router.navigate(['/login']);
      },
      (err) => this.error = err
      );
    console.log(this.user);
  }
  ////////////////////////////////////////////// profile


  // profile

  goGallery() {
    this.router.navigate(['/gallery']);
  }

}
