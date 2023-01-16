import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from '../models/post';

@Injectable({ providedIn: "root" })

export class PostService  {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }
    
    uploadImage(): Observable<any> {
        return this.http.post<any>(`${environment.qimgUrl}`);
    }
   
}