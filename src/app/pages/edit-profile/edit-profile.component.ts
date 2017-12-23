import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // @ViewChild('popup1') popup1: Popup;

  baseUrl = environment.apiUrl;

  formUpdate = {
    title: '',
    description: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  userData: any;
  username: any;
  userParam: any;
  id: any;
  dataUser: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.idUser();
    this.usernameParam();
    this.getUserInfo();
  }

  usernameParam() {
    this.route.params.subscribe(params => {
      this.userParam = params['id']; // --> Name must match wanted parameter
      console.log(this.username);
    });
  }

  getUserInfo() {
    this.userService.getUserId(this.userParam).subscribe((data) => {
      this.dataUser = data;
    });
  }

  idUser() {
    this.authService.me().then((user) => this.username = user);
  }

  updateUser() {
    this.userService.updateUser(this.username.username, this.formUpdate)
      .subscribe((data) => this.userData = data);
    this.router.navigate(['/user', this.username]);
  }

  goProfile() {
    this.router.navigate(['/user/' + this.username.username]);
  }



}
