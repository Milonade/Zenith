import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable} from "rxjs";


import { Post } from '../models/post';

@Injectable({ providedIn: "root" })

export class PostService  {
    constructor(private http: HttpClient) { }
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>('https://zenith.onrender.com/posts');
    }
   
}