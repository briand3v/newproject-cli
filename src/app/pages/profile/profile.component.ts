import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { error } from 'util';
import { UserService } from '../../services/user.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  value: any;
  photos: Object = [];
  details: Object = [];
  dataUser: any;
  user: any;
  error: string;
  private sub: any;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    // private params: Params
  ) { }

  ngOnInit() {
    this.idUser();
    this.getUserInfo();
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




























  ///////////////////////////////// AuthUser
  // me() {
  //   this.authService.me()
  //     .then((user) => {
  //       this.user = user,
  //         console.log(this.user);
  //     },
  //     (err) => this.error = err);
  //   console.log(this.user);
  // }

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

  goGallery() {
    this.router.navigate(['/gallery']);
  }

  // get params user

}
