import { Injectable, OnInit } from "@angular/core";
import { Location } from 'src/app/models/location';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface MapBoxOutput {
    attribution: string;
    features: Feature[];
    query: string;
}

export interface Feature {
    place_name: string;
}


@Injectable({ providedIn: "root" })

export class LocationService {
    constructor(private http: HttpClient) {

    }

    searchWord(query: string) {
        return this.http.get(`${environment.mapBox.geocodeUrl}${query}.json?access_token=${environment.mapBox.accessToken}`).pipe(map((res: MapBoxOutput) => {
            return res.features
        }))
    }
}