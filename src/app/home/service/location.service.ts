import { Geolocation } from '@capacitor/geolocation';
import { Injectable, OnInit } from "@angular/core";
import { Location } from 'src/app/models/location';
import { Observable } from "rxjs";
import { latLng } from 'leaflet';


@Injectable({ providedIn: "root" })

export class locationService {
    // Geolocation

    // C'est pas super utile vu que ça fait la même chose
    async locate(): Promise<Location> {
        const currentPos = await Geolocation.getCurrentPosition()

        return {
            lat: currentPos.coords.latitude,
            lng: currentPos.coords.longitude
        }
    }

    // addPosition$(location: Location): Observable<void> {

    // }
}