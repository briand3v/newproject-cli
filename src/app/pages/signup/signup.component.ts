import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  something: any;
  user = new User({
    username: '',
    password: '',
    profileName: ''
  });

  userdata: any;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.authService.me().then((me) => this.userdata = me);
  }


  signup() {
    this.error = null;
    this.authService.signup(this.user).subscribe(
      (data) => this.something = data,
      (err) => this.error = err
    );
  }

  goProfile() {
    this.router.navigate(['/profile', this.user.username]);
  }

}
