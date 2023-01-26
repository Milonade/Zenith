import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Post } from '../../models/post';
import { Location } from '../../models/location';
import { LocationService } from '../../home/service/location.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})


export class PostComponent implements OnInit {
  @Input() post: Post;

  location: Location;

  constructor(private adress: LocationService) {
    this.location = {
      cordinates: undefined
    }
  }



 async ngOnInit() { 

  }

}
