import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPost } from 'src/app/models/new-post';
import { PostService } from '../service/posts.service'; 

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  newPost: NewPost

  uploadError: boolean;

  constructor(private post: PostService) {
    this.newPost = {
      picture: undefined,
    };
  }

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    this.uploadError = false;

    this.post.uploadImage(form).subscribe({
      error: (err) => {
        this.uploadError = true;
        console.warn(`upload failed: ${err.message}`);
      },
    });


  }

  ngOnInit() {
  }

}
