import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/core/services/auth.service'
import { NotificationService } from '../services/notification.service'
import { Router } from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.notificationService.showNotification('You are not authorised to perform this action.')
          this.router.navigate(['/home'])
        }

        throw error
      })
    )
  }
}
