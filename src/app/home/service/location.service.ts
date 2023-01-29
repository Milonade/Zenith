import { Injectable, OnInit } from "@angular/core";
import { Location } from 'src/app/models/location';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ToastService } from "src/app/services/toast.service";

export interface MapBoxOutput {
    attribution: string;
    features: Feature[];
    query: string;
}

export interface Feature {
    place_name: string;
    geometry: {
        coordinates: []
    }
}


@Injectable({ providedIn: "root" })

export class LocationService {
    constructor(private http: HttpClient, private toast: ToastService) {

    }

    searchWord$(query: string): Observable<Feature[]>{
        try {
            return this.http.get(`${environment.mapBox.geocodeUrl}${query}.json?access_token=${environment.mapBox.accessToken}`).pipe(map((res: MapBoxOutput) => {
                return res.features
            }))  
        } catch(err) {
            this.toast.show('Failed to find addresses')
            return err.message
        }
    }

    reverseGeocode$(coords: number[]): Observable<Feature[]>{
        try {
            return this.http.get(`${environment.mapBox.geocodeUrl}${coords[0]},${coords[1]}.json?access_token=${environment.mapBox.accessToken}`).pipe(map((res: MapBoxOutput) => {
                return res.features
            }))  
        } catch(err) {
            console.warn(err.message)
            return err.message
        }
    }
}