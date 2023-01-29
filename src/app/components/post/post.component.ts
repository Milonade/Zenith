import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Post } from '../../models/post';
import { Location } from '../../models/location';
import { Feature, LocationService } from '../../home/service/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})


export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() comments: any[];
  @Input() showComments: boolean;
  @Input() totalComments: number;

  location: any;
  post_id: string;
  authId: string;
  placeName: string;
  alternateUrl: string;

  constructor(private router: Router, private auth: AuthService, private loca: LocationService) {

    this.alternateUrl = "https://i.kym-cdn.com/photos/images/original/001/102/822/616.jpg";

    this.auth.getUser$().subscribe(user => {
      this.authId = user._id
    })

  }

  ngOnInit() {
    // this.postId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges() {
    if(this.post) {
      this.loca.reverseGeocode$(this.post.location.coordinates).subscribe((features: Feature[]) => {
        this.placeName = features[0].place_name
      })
    }
  }

  onEditPost(post_id: string) {
    this.router.navigate(['/modify-post/', post_id]);
  }

  addComment(id: string) {
    this.router.navigate(['post', id, 'comment'])
  }

  onError() {
    this.post.picture.url = this.alternateUrl
  }
}
