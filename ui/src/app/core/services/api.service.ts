import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

/**
 * Service to make HTTP requests to the API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  /**
   * Makes a GET request to the API.
   * @param endpoint The endpoint to make the request to.
   * @param options The (optional) options to pass to the request.
   * @returns An observable that emits the response.
   */
  get<T>(endpoint: string, options: {} = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { ...options, withCredentials: true })
  }

  /**
   * Makes a POST request to the API.
   * @param endpoint The endpoint to make the request to.
   * @param body The body of the request.
   * @param options The (optional) options to pass to the request.
   * @returns An observable that emits the response.
   */
  post<T>(endpoint: string, body: any, options: {} = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { ...options, withCredentials: true })
  }

  /**
   * Makes a PUT request to the API.
   * @param endpoint The endpoint to make the request to.
   * @param body The body of the request.
   * @param options The (optional) options to pass to the request.
   * @returns An observable that emits the response.
   */
  put<T>(endpoint: string, body: any, options: {} = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, { ...options, withCredentials: true })
  }

  /**
   * Makes a DELETE request to the API.
   * @param endpoint The endpoint to make the request to.
   * @param options The (optional) options to pass to the request.
   * @returns An observable that emits the response.
   */
  delete<T>(endpoint: string, options: {} = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { ...options, withCredentials: true })
  }
}
