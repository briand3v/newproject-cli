import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.idUser();
  }

  idUser() {
    this.authService.me().then((user) => this.username = user);
  }

  updateUser() {
    this.userService.updateUser(this.username.username, this.formUpdate)
      .subscribe((data) => this.userData = data);
  }


  click() {
    $();
  }
}
