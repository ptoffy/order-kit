import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../../core/services/auth.service'

// This interceptor will add the user's token to the request headers.
// This will allow the user to access protected routes
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from the auth service
    const token = this.auth.getToken()

    // If the token exists, add it to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-auth-token': token,
          'x-requested-with': 'XMLHttpRequest'
        }
      })
    }

    return next.handle(request)
  }
}
