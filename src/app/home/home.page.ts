import { Component, makeEnvironmentProviders, OnInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet.markercluster";
import { Location } from '../models/location';
import { Observable } from 'rxjs';
import { LocationService } from './service/location.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { PostService } from './service/posts.service';
import { Post } from '../models/post';
import { PhotoIcon } from '../config/image-icons';
import { ClicMarker } from '../config/clic-markers';
import { Router } from '@angular/router';


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
  mapOptions: L.MapOptions;
  map: L.Map;
  mapMarkers: L.Marker[] = [];

  posts: Post[];
  postIcon: L.Icon;

  constructor(private post: PostService, private router: Router) {
    this.mapOptions = {
      layers: [
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
          },
        )
      ],
      zoom: 8,
      center: L.latLng(46.85, 8.2833)
    };
  }

  filterItems(event: any) {
    this.filteredItems = this.items?.filter(item => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  showSearchBar() {
    this.showSearch = !this.showSearch;
  }

  onMapReady(map: L.Map) {
    setTimeout(() => map.invalidateSize(), 0);
    this.map = map
  }

  private createIcon(url: String): L.Icon {
    const photoIcon = new PhotoIcon()
    photoIcon.options.html = `<div style="background-image: url(${url});"></div>`
    return photoIcon
  }

  /**
  Retrieves post data to create markers with post images and ids. Users are redirected to post page when they click on a marker. Unfortunately, there's no Angular binding available for marker click event yet.
  */
  private createMarkers(): void {
    this.post.getPosts$().subscribe(data => {
      this.posts = data;

      for (let i = 0; i < this.posts.length; i++) {

        const icon = this.createIcon(this.posts[i].picture.url)

        const marker = new ClicMarker()
        marker._latlng = [
          this.posts[i].location.coordinates[1],
          this.posts[i].location.coordinates[0]
        ]
        marker.options.icon = icon
        marker.options.id = this.posts[i]._id

        this.mapMarkers.push(marker)

        marker.on('click', (evt) => {
          this.router.navigate(['post', evt.target.options.id])
        })
      }
    });
  }

  /**
  Get the users location and recenter the map.
  */
  private async recenterMap() {
    this.currentPos = await Geolocation.getCurrentPosition()
    this.map.setView([this.currentPos.coords.latitude, this.currentPos.coords.longitude], 11)
  }

  ngOnInit() {
    this.createMarkers()
    this.recenterMap()
  }

}