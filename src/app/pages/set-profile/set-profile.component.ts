import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css']
})
export class SetProfileComponent implements OnInit {

  feedbackEnabled = false;
  userInfoProfile: any;
  username: any;


  baseUrl = environment.apiUrl;
  processing = false;

  uploader: FileUploader = new FileUploader({
    url: `${this.baseUrl}/upload`,
  });

  userProfile = {
    profileName: '',
    filename: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idUser();
  }

  idUser() {
    this.route.params.subscribe(params => {
      this.username = params['id']; // --> Name must match wanted parameter
      console.log(this.username);
    });
  }


  submitForm(theForm) {
    console.log(theForm);
    this.feedbackEnabled = true;
    if (theForm.valid) {
      this.processing = true;
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: string) => {
        const fileData = JSON.parse(response);
        this.userProfile.filename = fileData.filename;
        this.userService.getImgProfile(this.username, this.userProfile)
          .subscribe(result => {
            this.userInfoProfile = result;
            console.log(this.userInfoProfile);
          });
      };
    }
  }

  goUserProfile() {
    this.router.navigate(['/user', this.username]);
  }

}
