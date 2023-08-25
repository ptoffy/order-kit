import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private jwtTokenStorageName = 'auth-token';
  private jwtExpirationStorageName = 'auth-token-expiration';
  public redirectUrl: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  register(user: User) {
    return this.apiService.post('users/register', user)
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.post('users/login', { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.jwtTokenStorageName, res.token);
          localStorage.setItem(this.jwtExpirationStorageName, res.expiration);
          this.isAuthenticatedSubject.next(true);

          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          } else {
            this.router.navigate(['/']);
          }
        })
      );
  }

  // This method will return true if the user is authenticated, and false if they are not
  isAuthenticated(): boolean {
    const expiration = localStorage.getItem(this.jwtExpirationStorageName);
    if (!expiration) {
      return false;
    }
    return Date.now() < Number(expiration);
  }

  // This method will return the token
  getExpiration(): string | null {
    return localStorage.getItem(this.jwtExpirationStorageName);
  }

  getToken(): string | null {
    return localStorage.getItem(this.jwtTokenStorageName);
  }

  // This method will remove the token, logging the user out
  logout(): void {
    localStorage.removeItem(this.jwtExpirationStorageName);
    localStorage.removeItem(this.jwtTokenStorageName);
    this.isAuthenticatedSubject.next(false);
  }

  // write a method to get the current user from the backend
  getCurrentUser(): Observable<User | null> {
    if (!this.isAuthenticated()) {
      return new Observable<null>();
    }
    return this.apiService.get('users/me');
  }
}
