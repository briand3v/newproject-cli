import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Services
import { PhotoService } from '../../services/photo.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

// upload images
import { IPopup } from 'ng2-semantic-ui';
import { FileUploader } from 'ng2-file-upload';
import { error } from 'util';


// enviornment
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

  currentImage: any;

  checkFotoPorfile = false;
  checkFotoDefault = false;

  checkOwner: boolean;

  checkEdit = false;



  baseUrl = environment.apiUrl;
  feedbackEnabled = false;
  processing = false;
  photo = {
    filename: '',
    description: '',
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

  ) { }


  private _condition: boolean;
  public openPopup(popup: IPopup) {
    if (this._condition) {
      popup.open();
    }
  }

  ngOnInit() {
    this.me();
    this.idUser();
    this.getUserInfo();
    // this.checkEditButton();
    console.log(this.photos);
  }


  idUser() {
    this.route.params.subscribe(params => {
      this.username = params['id'];
      console.log(this.username);
    });
  }


  getUserInfo() {
    this.userService.getUserId(this.username).subscribe((data) => {
      this.dataUser = data;
      if (this.dataUser.filename === undefined) {
        this.checkFotoDefault = true;
      } else {
        this.currentImage = true;
      }
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

  checkEditButton() {
    if (this.user.username === this.username) {
      this.checkEdit = true;

    } else {
      this.checkEdit = false;
    }
  }

  goGallery() {
    this.router.navigate(['/gallery']);
  }

  goToMeProfile() {
    this.router.navigate(['/user', this.user.username]);
    console.log(this.user.username);
  }

  me() {
    this.authService.me().then((user) => {
      this.user = user;
      if (this.user.username === this.username) {
        this.checkEdit = true;
      } else {
        this.checkEdit = false;
      }
    });
  }
}
