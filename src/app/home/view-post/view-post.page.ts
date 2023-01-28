import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { PostService } from '../service/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  post: Post;
  totalComments: number;
  showComments: boolean;
  comments: Array<any>;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.showComments = true;
  }

  ngOnInit() {
    this.postService.getPost$(this.route.snapshot.paramMap.get('id')).subscribe(postRes => {
      this.post = postRes.post;
      this.totalComments = postRes.totalComments
    });

    this.postService.getComments$(this.route.snapshot.paramMap.get('id')).subscribe(commentRes => {
      this.comments = commentRes.data
    })
  }

}
