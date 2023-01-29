import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/home/service/posts.service';
import { PostComponent } from '../post/post.component';

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
  }

  posts:Post[];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts$().subscribe(data => {
      this.posts = data;
    });
  }
}
