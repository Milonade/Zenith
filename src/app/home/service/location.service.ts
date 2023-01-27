import { Geolocation } from '@capacitor/geolocation';
import { Injectable, OnInit } from "@angular/core";
import { Location } from 'src/app/models/location';
import { Observable } from "rxjs";
// import { NativeGeocoder } from '@capgo/nativegeocoder';
import { latLng } from 'leaflet';


@Injectable({ providedIn: "root" })

export class LocationService {
//     async reverseGeocode(latitude: number, longitude: number) {
//         const adress = await NativeGeocoder.reverseGeocode({ latitude, longitude });
//         console.log(adress);
//         return adress;
//     }
}