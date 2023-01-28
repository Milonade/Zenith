import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Post } from '../../models/post';
import { Location } from '../../models/location';
import { LocationService } from '../../home/service/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})


export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() comments: Comment[];
  @Input() showComments: boolean;
  @Input() totalComments: number;

  location: any;
  post_id: string;

  constructor(private router: Router) {

  }

  async ngOnInit() {

    // this.postId = +this.route.snapshot.paramMap.get('id');
  }

  onEditPost(post_id: string) {
    this.router.navigate(['/modify-post/', post_id]);
  }

  addComment(id: string) {
    this.router.navigate(['post', id, 'comment'])
  }
}
