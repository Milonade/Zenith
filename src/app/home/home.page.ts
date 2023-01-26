import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { Location } from '../models/location';
import { defaultIcon } from '../config/default-markers';
import { Observable } from 'rxjs';
import { LocationService } from './service/location.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { PostService } from './service/posts.service';
import { Post } from '../models/post';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})

export class HomePage implements OnInit {

  showSearch = false;
  items: any[];
  filteredItems: any[];
  searchTerm: string;

  currentPos: Position;
  mapMarkers: Marker[];
  mapOptions: MapOptions;

  posts: Post[];

  filterItems(event: any) {
    this.filteredItems = this.items?.filter(item => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  showSearchBar(){
    this.showSearch = !this.showSearch;
  }



  constructor(private location: LocationService, private post: PostService) {
    this.mapMarkers = [];

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  async ngOnInit() {
    this.post.getPosts$().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });

    this.currentPos = await Geolocation.getCurrentPosition()

    this.mapMarkers.push(marker([
      this.currentPos.coords.latitude,
      this.currentPos.coords.longitude
    ],
      { icon: defaultIcon }))
  }

}
