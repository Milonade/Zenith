import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPost } from 'src/app/models/new-post';
import { Location } from 'src/app/models/location';
import { PostService } from '../service/posts.service';
import { Image } from 'src/app/models/image';
import { Geolocation, Position } from '@capacitor/geolocation';
import { AuthService } from 'src/app/auth/auth.service';
import { LocationService, Feature } from '../service/location.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  newPost: NewPost
  picture: Image;
  userId: string;

  uploadError: boolean;
  postPostError: boolean;

  addresses: string[];
  selectedAddress: string;
  currentPos: Position;
  locationIsCkecked: boolean;

  constructor(private post: PostService, private auth: AuthService, private location: LocationService) {
    this.addresses = []
    this.selectedAddress = undefined;
    this.locationIsCkecked = false;

    this.auth.getUser$().subscribe(user => {
      this.userId = user._id
    })

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
      userId: this.userId
    }
  }

  uploadPicture() {
    this.post.takeAndUploadPicture().subscribe(data => {
      this.picture = data;
      this.newPost.picture = this.picture
    });
  }

  search(event: any) {
    const searchTerm: string = event.target.value.toLowerCase()

    if (searchTerm && searchTerm.length > 0) {
      this.location.searchWord(searchTerm).subscribe((features: Feature[]) => {
        this.addresses = features.map(feat => feat.place_name)
      })

    } else {
      this.addresses = []
    }
  }

  onSelect(address: string) {
    this.selectedAddress = address
    this.addresses = []
  }

  onClick(event: any) {
    event.target.checked ? this.locationIsCkecked = true : this.locationIsCkecked = false;
  }

  onSubmit(form: NgForm) {
    console.log(form.value)

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

    this.postPostError = false;
    this.post.postPost$(this.newPost).subscribe({
      error: (err) => {
        this.postPostError = true;
        console.warn(`Failed to post: ${err.message}`);
      }
    });

  }

  async ngOnInit() {
    // this.currentPos = await Geolocation.getCurrentPosition()
    // this.newPost.location.coordinates = [this.currentPos.coords.longitude, this.currentPos.coords.latitude];
  }

}
