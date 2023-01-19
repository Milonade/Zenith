import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from '../../models/post';
import { url } from "inspector";

@Injectable({ providedIn: "root" })

export class PostService {

    imgHeader = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${environment.qimgToken}`
    });

    requestOptions = { headers: this.imgHeader };

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    // createPost(Post: Post): Observable<Post> {
    //     return this.http.post<Post>(`${environment.apiUrl}/posts`, )
    // }

    uploadImage(imgRequest): Observable<any> {
        return this.http.post<any>(`${environment.qimgUrl}/images/`, imgRequest, this.requestOptions);
    }

    retrieveImage(): Observable<any> {
        return this.http.get<any>(`${environment.qimgUrl}/images/`, this.requestOptions);
    }

    deleteImage(imgId): Observable<any> {
        return this.http.post<any>(`${environment.qimgUrl}/images/${imgId}`, this.requestOptions);
    }

}