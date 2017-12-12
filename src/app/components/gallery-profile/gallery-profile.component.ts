import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-gallery-profile',
  templateUrl: './gallery-profile.component.html',
  styleUrls: ['./gallery-profile.component.css']
})
export class GalleryProfileComponent implements OnInit {

  photos: Object = [];
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.photoService.showAllPhotosByOwner().subscribe((data) => this.photos = data);
  }


}
