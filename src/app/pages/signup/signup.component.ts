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

  user = new User({
    username: '',
    password: ''
  });

  me: any;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.authService.me().then((me) => this.me = me);
  }

  // signup() {
  //   this.authService.signup(this.user)
  //     .subscribe(
  //     () => this.router.navigate(['/user/']),
  //     (err) => this.error = err
  //     );
  // }


  signup() {
    this.error = null;
    this.authService.signup(this.user).subscribe(
      () => this.router.navigate(['/user/:id']),
      (err) => this.error = err
    );
  }

}
