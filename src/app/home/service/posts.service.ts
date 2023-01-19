import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from '../../models/post';
import { NewPost } from "src/app/models/new-post";

@Injectable({ providedIn: "root" })

export class PostService {

    imgHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.qimgToken}`
    });

    requestOptions = { headers: this.imgHeader };

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    // createPost(FormData: FormData): Observable<NewPost> {
    //     const imgUrl = this.uploadImage(img);
    //     Post.picture.url = imgUrl
    //     return this.http.post<NewPost>(`${environment.apiUrl}/posts`, Post)
    // }

    uploadImage(img): Observable<any> {
        return this.http.post<any>(`${environment.qimgUrl}/images/`, img, this.requestOptions);
    }

    retrieveImage(): Observable<any> {
        return this.http.get<any>(`${environment.qimgUrl}/images/`, this.requestOptions);
    }

    deleteImage(imgId): Observable<any> {
        return this.http.post<any>(`${environment.qimgUrl}/images/${imgId}`, this.requestOptions);
    }

}