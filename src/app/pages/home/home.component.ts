import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Photos } from '../../models/photos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  photos: Object = [];



  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.homeService.showAllPhotos()
      .then(data => this.photos = data);
  }

}
