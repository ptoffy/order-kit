import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// This service will be used to make HTTP requests to the API
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, options: {} = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { ...options, withCredentials: true });
  }

  post<T>(endpoint: string, body: any, options: {} = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { ...options, withCredentials: true });
  }

  put<T>(endpoint: string, body: any, options: {} = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, { ...options, withCredentials: true });
  }

  delete<T>(endpoint: string, options: {} = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { ...options, withCredentials: true });
  }
}
