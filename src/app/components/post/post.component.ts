import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(private http: HttpClientModule) { }

  getPosts(): Observable<any> {
    return this.http.get<any>('https://your-api-endpoint.com/posts');
  }

  ngOnInit() {}

}
