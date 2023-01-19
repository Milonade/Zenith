import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { first, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { PostService } from "./posts.service";

@Injectable({ providedIn: "root" })
export class ImgInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve ImgService at runtime from the injector.
    // (Otherwise there would be a circular dependency:
    //  ImgInterceptorService -> ImgService -> HttpClient -> ImgInterceptorService).
    const Img = this.injector.get(PostService);

    // Get the bearer token (if any).
    return environment.qimgToken.pipe(
      first(),
      switchMap((token) => {
        // Add it to the request if it doesn't already have an Authorization header.
        if (token && !req.headers.has("Authorization")) {
          req = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`),
          });
        }
        return next.handle(req);
      })
    );
  }
}