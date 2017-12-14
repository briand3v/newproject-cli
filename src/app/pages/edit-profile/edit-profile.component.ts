import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// import { Popup } from 'ng2-opd-popup';




@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // @ViewChild('popup1') popup1: Popup;

  formUpdate = {
    title: '',
    description: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  userData: any;
  username: any;
  id: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  // ClickButton() {

  //   this.popup1.options = {
  //     header: 'Your custom header',
  //     color: '#5cb85c', // red, blue....
  //     widthProsentage: 40, // The with of the popou measured by browser width
  //     animationDuration: 1, // in seconds, 0 = no animation
  //     showButtons: true, // You can hide this in case you want to use custom buttons
  //     confirmBtnContent: 'OK', // The text on your confirm button
  //     cancleBtnContent: 'Cancel', // the text on your cancel button
  //     confirmBtnClass: 'btn btn-default', // your class for styling the confirm button
  //     cancleBtnClass: 'btn btn-default', // you class for styling the cancel button
  //     animation: 'fadeInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
  //   };

  //   this.popup1.show(this.popup1.options);
  // }

  ngOnInit() {
    this.idUser();
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
