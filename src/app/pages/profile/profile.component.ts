import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  photos: Object = [];
  details: Object = [];
  id: number;
  private sub: any;
  user: any;
  error: string;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.me();
  }

  // user
  me() {
    this.authService.me()
      .then((user) => {
        this.user = user,
          console.log(this.user);
      },
      (err) => this.error = err);
    console.log(this.user);
  }


  // logout provicional it have to appear in the navbar
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


  // profile

  goGallery() {
    this.router.navigate(['/gallery']);
  }

  // userDetails() {
  //   this.profileService.userDetails().subscribe((data) => this.details = data);
  // }
}
