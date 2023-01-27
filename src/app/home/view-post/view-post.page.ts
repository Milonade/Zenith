import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostComments } from 'src/app/models/post-comments';
import { PostService } from '../service/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  post: Post;
  totalComments: number;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.postService.getPost$(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.post = data.post;
      this.totalComments = data.totalComments
      console.log(this.post)
    });
  }

}
