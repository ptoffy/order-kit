import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private jwtTokenStorageName = 'auth-token';
  private jwtExpirationStorageName = 'auth-token-expiration';
  private currentUserRoleStorageName = 'user-role';

  constructor(
    private apiService: ApiService,
  ) {
    this.isAuthenticatedSubject.next(this.isAuthenticated());
  }

  register(user: User): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('users/register', user)
      .pipe(
        tap(res => {
          this.setCurrentUser(res);
        })
      );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('users/login', { username, password })
      .pipe(
        tap(res => {
          this.setCurrentUser(res);
        })
      );
  }

  list(): Observable<User[]> {
    return this.apiService.get('users');
  }

  delete(username: string): Observable<any> {
    return this.apiService.delete(`users/${username}`);
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
    localStorage.removeItem(this.currentUserRoleStorageName);
    this.isAuthenticatedSubject.next(false);
  }

  // write a method to get the current user from the backend
  getCurrentUser(): Observable<User | null> {
    if (!this.isAuthenticated()) {
      return new Observable<null>();
    }
    return this.apiService.get('users/me');
  }

  getCurrentUserRole(): UserRole | null {
    return localStorage.getItem(this.currentUserRoleStorageName) as UserRole;
  }

  private setCurrentUser(res: LoginResponse) {
    localStorage.setItem(this.jwtTokenStorageName, res.token);
    localStorage.setItem(this.jwtExpirationStorageName, res.expiration);
    localStorage.setItem(this.currentUserRoleStorageName, res.role);
    this.isAuthenticatedSubject.next(true);
  }
}

interface LoginResponse {
  token: string;
  expiration: string;
  role: UserRole;
}
