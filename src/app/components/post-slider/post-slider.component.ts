import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/home/service/posts.service';
import { PostComponent } from '../post/post.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-slider',
  templateUrl: './post-slider.component.html',
  styleUrls: ['./post-slider.component.scss'],
})
export class PostSliderComponent implements OnInit {
  //open and close modal
  isModalOpen = true;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    //dismiss modal when routed to another page
  }

  posts: Post[];
  myPosts: Post[];
  userId: string;

  constructor(private auth: AuthService, private postService: PostService) {
    this.myPosts = [];

    this.auth.getUser$().subscribe(user => {
      this.userId = user._id
    })

  }

  onClick(evt: any) {
    if (evt.target.checked) {
      this.posts.forEach(post => {
        if (post.userId._id == this.userId) {
          this.myPosts.push(post);
        }
      })
      this.posts = this.myPosts;
    }
    else {
      this.postService.getPosts$().subscribe(data => {
        this.posts = data;
      });
    }
  }


  ngOnInit() {
    this.postService.getPosts$().subscribe(data => {
      this.posts = data;
    });
  }
}
