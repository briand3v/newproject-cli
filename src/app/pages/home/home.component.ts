import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Photos } from '../../models/photos.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  photos: Object = [];
  user: any;
  error: string;



  constructor(private homeService: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getPhotos();
    this.me();
  }

  getPhotos() {
    this.homeService.showAllPhotos().subscribe((data) => this.photos = data);
  }

  logOut() {
    this.authService.logout()
      .subscribe(
      () => {
        // this.user = null,
        this.router.navigate(['/login']);
      },
      (err) => this.error = err
      );
  }
  me() {
    this.authService.me().then((user) => this.user = user);
  }

}
