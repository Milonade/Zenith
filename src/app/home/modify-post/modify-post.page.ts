import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from 'src/app/models/location';
import { PostService } from '../service/posts.service';
import { Image } from 'src/app/models/image';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.page.html',
  template: `<p>Post Id: {{ postId }}</p>`,
  styleUrls: ['./modify-post.page.scss'],
})
export class ModifyPostPage implements OnInit {

  modifiedPost: Post;
  uploadError: boolean;
  picture: Image;
  defineLocation: Location;
  currentPos: Position;
  currentPost: Object;
  postId: string;

  constructor(private post: PostService, private http: HttpClient) {
    this.picture = {
      id: "",
      size: "",
      url: "",
      createdAt: "",
    };
    this.modifiedPost = {
      _id: "",
      picture:{
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
    // this.post.patchPost$(this.modifiedPost).subscribe({

    // });

  }

  async ngOnInit() {
    // this.postId = this.route.snapshot.queryParams['postId'];
    // console.log(this.postId);
    // this.post.getPost$(this.postId)
    // .subscribe((this.modifiedPost) => {
    //   // do something with the post
    // });

    this.currentPos = await Geolocation.getCurrentPosition()
    this.modifiedPost.location.coordinates = [this.currentPos.coords.longitude, this.currentPos.coords.latitude];

  }

}
