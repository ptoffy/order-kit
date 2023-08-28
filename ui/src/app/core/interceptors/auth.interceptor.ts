import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


/**
 * Intercepts all HTTP requests and adds the custom auth headers if the user is logged in.
 */
@Injectable()
class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");

    if (!idToken) {
      return next.handle(req);
    }

    const headers = new HttpHeaders({
      "x-auth-token": idToken,
      "x-requested-with": "XMLHttpRequest"
    });

    for (const key of req.headers.keys()) {
      headers.append(key, req.headers.get(key)!);
    }

    const cloned = req.clone({
      headers: headers
    });

    return next.handle(cloned);
  }
}

export { AuthInterceptor };
