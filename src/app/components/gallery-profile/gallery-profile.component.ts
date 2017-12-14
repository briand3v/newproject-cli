import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gallery-profile',
  templateUrl: './gallery-profile.component.html',
  styleUrls: ['./gallery-profile.component.css']
})
export class GalleryProfileComponent implements OnInit {

  @Output() hide = new EventEmitter<string>();
  baseUrl = environment.apiUrl;
  photos: Object = [];
  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  username: any;

  ngOnInit() {
    this.idUser();
    this.getPhotosOwner();
  }

  idUser() {
    this.route.params.subscribe(params => {
      this.username = params['id']; // --> Name must match wanted parameter
      console.log(this.username);
    });
  }

  clickPhoto(photo) {
    this.router.navigate(['/photo/owner/', this.username, photo._id]);
  }

  getPhotosOwner() {
    this.photoService.showAllPhotosByVisitor(this.username).subscribe((data) => this.photos = data);
  }
}
