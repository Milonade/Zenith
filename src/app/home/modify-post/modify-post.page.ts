import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from 'src/app/models/location';
import { PostService } from '../service/posts.service';
import { Image } from 'src/app/models/image';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Post } from 'src/app/models/post';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.page.html',
  styleUrls: ['./modify-post.page.scss'],
})
export class ModifyPostPage implements OnInit {

  modifiedPost: Post;
  uploadError: boolean;
  picture: Image;
  defineLocation: Location;
  currentPos: Position;
  currentPost: Object;
  postId: any;

  constructor(private post: PostService, private route: ActivatedRoute) {
    this.picture = {
      id: "",
      size: "",
      url: "",
      createdAt: "",
    };
    this.modifiedPost = {
      _id: "",
      picture: {
        ext: ".jpg",
        url: "",
      },
      location: {
        type: 'Point',
        coordinates: undefined
      },
      description: "",
      creationDate: undefined,
      visitDate: undefined,
      modificationDate: undefined,
      visible: true,
      userId: undefined
    }
  }

  uploadPicture() {
    this.post.takeAndUploadPicture().subscribe(data => {
      this.picture = data;
      this.modifiedPost.picture.url = this.picture.url
    });
  }

  onSubmit(form: NgForm) {

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    this.uploadError = false;
    this.post.uploadImage(this.picture.url).subscribe({
      error: (err) => {
        this.uploadError = true;
        console.warn(`upload failed: ${err.message}`);
      },
    });


    this.post.patchPost$(this.postId, this.modifiedPost).subscribe({
    });
  }

  async ngOnInit() {

    this.route.params.subscribe(params => {
      this.postId = params['_id'];
    });

    this.post.getPost$(this.postId)
      .subscribe(data => {
        this.modifiedPost = data.post;
        console.log(this.modifiedPost);
      });


  }

}
