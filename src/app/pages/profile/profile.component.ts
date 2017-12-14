import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { IPopup } from 'ng2-semantic-ui';

import { FileUploader } from 'ng2-file-upload';

import { error } from 'util';
import { UserService } from '../../services/user.service';

import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  private sub: any;
  username: any;
  photos: Object = [];
  photoInfo: any;
  details: Object = [];
  dataUser: any;
  user: any;
  error: string;
  modal = true;
  collapse: any;


  checkOwner: boolean;



  baseUrl = environment.apiUrl;
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


  private _condition: boolean;
  public openPopup(popup: IPopup) {
    if (this._condition) {
      popup.open();
    }
  }

  ngOnInit() {
    this.idUser();
    this.getUserInfo();
    // this.checkUser();
    console.log(this.photos);
  }


  idUser() {
    this.route.params.subscribe(params => {
      this.username = params['id']; // --> Name must match wanted parameter
      console.log(this.username);
    });
  }

  // checkUser() {
  //   if (this.username === 'brian_bmx') {
  //     this.checkOwner = true;
  //   } else {
  //     this.checkOwner = false;
  //   }
  // }


  getUserInfo() {
    this.userService.getUserId(this.username).subscribe((data) => {
      this.dataUser = data;
      if (this.username === 'brian_bmx') {
        this.checkOwner = true;
      } else {
        this.checkOwner = false;
      }
      console.log(this.checkOwner);
    });
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
            this.photoInfo = result;
            console.log(this.photoInfo);
          });
      };
    }
  }


  goToGallery() {
    this.router.navigate(['/gallery']);
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
