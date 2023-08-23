import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // This method will return true if the user is authenticated, and false if they are not
  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    // We might want to check if the token is expired here as well
    return token ? true : false;
  }

  // This method will return the token
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  // This method will remove the token, logging the user out
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
