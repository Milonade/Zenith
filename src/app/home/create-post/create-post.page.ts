import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPost } from 'src/app/models/new-post';
import { Location } from 'src/app/models/location';
import { PostService } from '../service/posts.service';
import { Image } from 'src/app/models/image';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  newPost: NewPost
  uploadError: boolean;
  picture: Image;
  defineLocation: Location;
  currentPos: Position;

  constructor(private post: PostService) {
    this.picture = {
      id: "",
      size: "",
      url: "",
      createdAt: "",
    };
    this.newPost = {
      picture: undefined,
      location: {
        type: 'Point',
        coordinates: undefined
      },
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
      console.log(this.picture);
      this.newPost.picture = this.picture
    });
  }
  // async currentLocation() {
  //   this.currentPos = await Geolocation.getCurrentPosition()
  //   console.log(this.currentPos);
  //   this.defineLocation.cordinates = [this.currentPos.coords.longitude, this.currentPos.coords.latitude];
  // }

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
    this.post.postPost$(this.newPost).subscribe({

    });

  }

  async ngOnInit() {
    this.currentPos = await Geolocation.getCurrentPosition()
    this.newPost.location.coordinates = [this.currentPos.coords.longitude, this.currentPos.coords.latitude];

  }

}
