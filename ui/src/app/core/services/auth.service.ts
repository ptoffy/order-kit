import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtTokenStorageName = 'auth-token';
  private jwtExpirationStorageName = 'auth-token-expiration';

  constructor(private apiService: ApiService) { }

  register(user: User) {
    return this.apiService.post('users/register', user)
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.post('users/login', { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.jwtTokenStorageName, res.token);
          localStorage.setItem(this.jwtExpirationStorageName, res.expiresAt);
        })
      );
  }

  // This method will return true if the user is authenticated, and false if they are not
  isAuthenticated(): boolean {
    const expiration = localStorage.getItem(this.jwtExpirationStorageName);
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
  }
}
