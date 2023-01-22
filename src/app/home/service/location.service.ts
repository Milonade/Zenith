import { Geolocation } from '@capacitor/geolocation';
import { Injectable, OnInit } from "@angular/core";

@Injectable({ providedIn: "root" })

export class locationService {
    // Geolocation
    printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();

        console.log('Current position:', coordinates);
    };
}