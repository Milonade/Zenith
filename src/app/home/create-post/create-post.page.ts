import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPost } from 'src/app/models/new-post';
import { PostService } from '../service/posts.service'; 
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  newPost: NewPost
  uploadError: boolean;
  picture: Image;
   

  constructor(private post: PostService) {
    this.picture = {
      id: "",
      size: "",
      url: "",
      createdAt: "",
    }; 
    this.newPost = {
      picture: this.picture,
      description: "",
      creationDate: undefined,
      visitDate: undefined,
      modificationDate: undefined,
      visible: true,
      userId: ""     
    }
 }

  uploadPicture() {
    this.post.takeAndUploadPicture().subscribe(data => {
      this.picture = data;
      
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value)

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }
    
    this.uploadError = false;
    // this.post.uploadImage(this.picture.base64String).subscribe({     
    //   error: (err) => {
    //     this.uploadError = true;
    //     console.warn(`upload failed: ${err.message}`);
    //   },     
    // });
    this.post.postPost$(this.newPost).subscribe( {
      
    });

  }

  ngOnInit() {
  }

}
