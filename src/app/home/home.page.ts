import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { Location } from '../models/location';
import { defaultIcon } from '../config/default-markers';
import { Observable } from 'rxjs';
import { locationService } from './service/location.service';
import { Geolocation, Position } from '@capacitor/geolocation';


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

  filterItems(event: any) {
    this.filteredItems = this.items?.filter(item => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  showSearchBar(){
    this.showSearch = !this.showSearch;
  }

  currentPos: Position;

  mapMarkers: Marker[];
  mapOptions: MapOptions;

  constructor(private location: locationService) {
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
    this.currentPos = await Geolocation.getCurrentPosition()
    // this.currentPos = this.location.locate()

    this.mapMarkers.push(marker([
      this.currentPos.coords.latitude,
      this.currentPos.coords.longitude
    ],
      { icon: defaultIcon }))
  }

}
