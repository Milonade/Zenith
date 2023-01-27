import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Post } from '../../models/post';
import { Location } from '../../models/location';
import { LocationService } from '../../home/service/location.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})


export class PostComponent implements OnInit {
  @Input() post: Post;

  location: any;
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  post_id: any;

  constructor(private nativeGeocoder: NativeGeocoder,  private route: ActivatedRoute, private router: Router) {
    
  }

  async ngOnInit() {
    this.nativeGeocoder.reverseGeocode(this.post.location.coordinates[1], this.post.location.coordinates[0], this.options)
      .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
      .catch((error: any) => console.log(error));
      // this.postId = +this.route.snapshot.paramMap.get('id');
  }

  onEditPost(post_id: any) {
    console.log(post_id);
    this.router.navigate(['/modify-post/', post_id ]);
   
  }
}
