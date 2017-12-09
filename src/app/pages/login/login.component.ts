import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  user = new User({
    username: '',
    password: ''
  });

  error: string;

  ngOnInit() {
  }



  login() {
    this.error = null;
    this.authService.login(this.user)
      .subscribe(
      () => this.router.navigate(['/user/:id']),
      (err) => this.error = err
      );
  }

  back() {
    this.router.navigate(['/signup']);
  }

}