import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-photo-owner',
  templateUrl: './photo-owner.component.html',
  styleUrls: ['./photo-owner.component.css']
})
export class PhotoOwnerComponent implements OnInit {

  username: any;
  photoId: any;
  photoOwner: object;

  constructor(private photoService: PhotoService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.idUser();
    this.idPhoto();
    this.getPhotoByOwner();
  }

  idUser() {
    this.route.params.subscribe(params => {
      this.username = params['id']; // --> Name must match wanted parameter
      console.log(this.username);
    });
  }
  idPhoto() {
    this.route.params.subscribe(params => {
      this.photoId = params['idPhoto']; // --> Name must match wanted parameter
      console.log(this.photoId);
    });
  }


  getPhotoByOwner() {
    //
    this.photoService.showPhotoByOwner(this.username, this.photoId).subscribe((data) => this.photoOwner = data);

  }


}
