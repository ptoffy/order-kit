import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { User, UserRole } from '../models/user.model'
import { ApiService } from 'src/app/core/services/api.service'
import { LoginResponse } from '../dtos/user.dto'

/**
 * Service to manage authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath = 'users'
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated())
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()
  private jwtTokenStorageName = 'auth-token'
  private jwtExpirationStorageName = 'auth-token-expiration'
  private currentUserRoleStorageName = 'user-role'
  private currentUserIdStorageName = 'user-id'

  /**
   * Constructor.
   * @param apiService The API service.
   */
  constructor(private apiService: ApiService) {
    this.isAuthenticatedSubject.next(this.isAuthenticated())
  }

  /**
   * Registers a new user.
   * @param user The user to register.
   * @returns An observable that emits the login response.
   */
  register(user: User): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>(`${this.basePath}/register`, user)
      .pipe(
        tap(res => {
          this.setCurrentUser(res)
        })
      )
  }

  /**
   * Logs in a user.
   * @param username The username of the user to log in. 
   * @param password The password of the user to log in.
   * @returns An observable that emits the login response.
   */
  login(username: string, password: string): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>(`${this.basePath}/login`, { username, password })
      .pipe(
        tap(res => {
          this.setCurrentUser(res)
        })
      )
  }

  /**
   * Lists all users.
   * @returns An observable that emits the list of users.
   */
  list(): Observable<User[]> {
    return this.apiService.get(this.basePath)
  }

  /**
   * Deletes a user.
   * @param username The username of the user to delete. 
   * @returns An observable that emits the response.
   */
  delete(username: string): Observable<any> {
    return this.apiService.delete(`${this.basePath}/${username}`)
  }

  /**
   * Checks if the user is authenticated.
   * @returns True if the user is authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    const expiration = localStorage.getItem(this.jwtExpirationStorageName)
    if (!expiration)
      return false
    return Date.now() < Number(expiration)
  }

  /**
   * Gets the expiration date of the JWT token.
   * @returns The expiration date of the JWT token.
   */
  getExpiration(): string | null {
    return localStorage.getItem(this.jwtExpirationStorageName)
  }

  /**
   * Gets the JWT token.
   * @returns The JWT token.
   */
  getToken(): string | null {
    return localStorage.getItem(this.jwtTokenStorageName)
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    localStorage.removeItem(this.jwtExpirationStorageName)
    localStorage.removeItem(this.jwtTokenStorageName)
    localStorage.removeItem(this.currentUserRoleStorageName)
    localStorage.removeItem(this.currentUserIdStorageName)
    this.isAuthenticatedSubject.next(false)
  }

  /**
   * Gets the current user.
   * @returns An observable that emits the current user.
   * @throws An error if the user is not authenticated.
   */
  getCurrentUser(): Observable<User> {
    if (!this.isAuthenticated()) {
      throw new Error('User is not authenticated')
    }
    return this.apiService.get(`${this.basePath}/me`)
  }

  /**
   * Gets the current user role.
   * @returns The current user role.
   */
  getCurrentUserRole(): UserRole | null {
    return localStorage.getItem(this.currentUserRoleStorageName) as UserRole
  }

  /**
   * Sets the current user.
   * @param res The login response.
   */
  private setCurrentUser(res: LoginResponse) {
    localStorage.setItem(this.jwtTokenStorageName, `${res.header}.${res.payload}`)
    localStorage.setItem(this.jwtExpirationStorageName, res.expiration)
    localStorage.setItem(this.currentUserRoleStorageName, res.role)
    localStorage.setItem(this.currentUserIdStorageName, res.id)
    this.isAuthenticatedSubject.next(true)
  }

  /**
   * Gets the current user ID.
   * @returns The current user ID.
   */
  getCurrentUserId(): string | null {
    return localStorage.getItem(this.currentUserIdStorageName)
  }
}


