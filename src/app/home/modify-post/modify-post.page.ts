import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from 'src/app/models/location';
import { PostService } from '../service/posts.service';
import { Image } from 'src/app/models/image';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Post } from 'src/app/models/post';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocationService, Feature } from '../service/location.service';
import { ToastService } from 'src/app/services/toast.service';

interface Address {
  name: string,
  coordinates: number[]
}

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.page.html',
  styleUrls: ['./modify-post.page.scss'],
})
export class ModifyPostPage implements OnInit {

  editPost: Post;
  picture: Image;
  postId: any;
  userId: any;

  uploadError: boolean;
  editPostError: boolean;

  addresses: Address[];
  selectedAddress: Address;
  currentPos: Position;
  isGeolocated: boolean;
  deniedGeoloc: boolean;
  hasSelectedAddress: boolean;
  hasChangedPicture: boolean;

  maxDate: string;

  constructor(private post: PostService, private location: LocationService, private toast: ToastService,
    private route: ActivatedRoute, private router: Router, private auth: AuthService) {

    this.maxDate = new Date().toISOString();

    this.addresses = []
    this.selectedAddress = {
      name: '',
      coordinates: []
    }
    this.deniedGeoloc = false;
    this.isGeolocated = false;
    this.hasSelectedAddress = false;
    this.hasChangedPicture = false;

    this.picture = {
      id: "",
      size: "",
      url: "",
      createdAt: "",
    };

    this.editPost = {
      _id: "",
      picture: {
        ext: "",
        url: "",
      },
      location: {
        type: 'Point',
        coordinates: []
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
      this.hasChangedPicture = true;
    });
  }

  search(event: any) {
    const searchTerm: string = event.target.value.toLowerCase()

    if (searchTerm && searchTerm.length > 0) {
      this.location.searchWord$(searchTerm).subscribe((features: Feature[]) => {
        this.addresses = features.map(feat => ({ name: feat.place_name, coordinates: feat.geometry.coordinates }))
      })

    } else {
      this.addresses = []
    }
  }

  onSelect(address: Address) {
    this.selectedAddress = address
    this.addresses = []
    this.hasSelectedAddress = true;
  }

  async onClick(evt: any) {

    if (evt.target.checked) {
      try {
        this.currentPos = await Geolocation.getCurrentPosition()
        this.editPost.location.coordinates = [this.currentPos.coords.longitude, this.currentPos.coords.latitude];
        this.isGeolocated = true;
      } catch (err) {
        this.deniedGeoloc = true;
        this.toast.show('Geolocation failed')
      }
    } else {
      this.isGeolocated = false;
    }
  }

  onSubmit(form: NgForm) {

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }


    this.editPost.description = form.value.description
    this.editPost.visitDate = form.value.visitDate

    if (!this.isGeolocated && this.hasSelectedAddress) {
      this.editPost.location.coordinates = [
        this.selectedAddress.coordinates[0],
        this.selectedAddress.coordinates[1]
      ]
    }

    if (this.hasChangedPicture) {
      this.editPost.picture.url = this.picture.url
      this.uploadError = false;
      this.post.uploadImage(this.picture.url).subscribe({
        error: (err) => {
          this.uploadError = true;
          console.warn(`upload failed: ${err.message}`);
        },
      });
    }

    this.editPostError = false;
    this.post.patchPost$(this.postId, this.editPost).subscribe({
      next: () => {
        this.router.navigate(['/'])
        this.toast.show('Post edited successfully')
      },
      error: (err) => {
        this.editPostError = true;
        console.warn(`Failed to edit post: ${err.message}`);
      }

    });

  }

  async ngOnInit() {

    this.route.params.subscribe(params => {
      this.postId = params['_id'];
    });

    this.post.getPost$(this.postId)
      .subscribe(data => {
        this.editPost = data.post;
      });

  }

}
