import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewPost } from 'src/app/models/new-post';
import { Location } from 'src/app/models/location';
import { PostService } from '../service/posts.service';
import { Image } from 'src/app/models/image';
import { Geolocation, Position } from '@capacitor/geolocation';
import { AuthService } from 'src/app/auth/auth.service';
import { LocationService, Feature } from '../service/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

interface Address {
  name: string,
  coordinates: number[]
}

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

  addresses: Address[];
  selectedAddress: Address;
  currentPos: Position;
  isGeolocated: boolean;
  deniedGeoloc: boolean;

  maxDate: string;

  constructor(private post: PostService, private auth: AuthService, private location: LocationService, private toast: ToastService, private router: Router) {

    this.maxDate = new Date().toISOString();

    this.addresses = []
    this.selectedAddress = {
      name: '',
      coordinates: []
    }
    this.deniedGeoloc = false;
    this.isGeolocated = false;

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
        coordinates: []
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
      this.location.searchWord$(searchTerm).subscribe((features: Feature[]) => {
        this.addresses = features.map(feat => ({name: feat.place_name, coordinates: feat.geometry.coordinates}))
      })

    } else {
      this.addresses = []
    }
  }

  onSelect(address: Address) {
    this.selectedAddress = address
    this.addresses = []
  }

  async onClick(evt: any) {

    if (evt.target.checked) {
      try {
        this.currentPos = await Geolocation.getCurrentPosition()
        this.newPost.location.coordinates = [this.currentPos.coords.longitude, this.currentPos.coords.latitude];
        this.isGeolocated = true;
      } catch(err) {
        this.deniedGeoloc = true;
        this.toast.show('Geolocation failed')
      }
    } else {
      this.isGeolocated = false;
      this.newPost.location.coordinates = []
    }
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

    this.newPost.description = form.value.description
    this.newPost.visitDate = new Date(form.value.visitDate)

    if (!this.isGeolocated) {
      this.newPost.location.coordinates = [
        this.selectedAddress.coordinates[0],
        this.selectedAddress.coordinates[1]
      ]
    }

    this.postPostError = false;
    this.post.postPost$(this.newPost).subscribe({
      next: () => {
        this.router.navigate(['/'])
        this.toast.show('Post created successfully')
      },
      error: (err) => {
        this.postPostError = true;
        console.warn(`Failed to post: ${err.message}`);
      }
    });
  }

  ngOnInit() {

  }

}

