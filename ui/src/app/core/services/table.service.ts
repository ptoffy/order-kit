import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Table } from '../models/table.model'

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private apiService: ApiService) { }

  list(): Observable<Table[]> {
    return this.apiService.get('table')
  }

  occupy(tableNumber: number, peopleCount: number): Observable<void> {
    return this.apiService.post(`table/${tableNumber}/occupy`, { peopleCount })
  }

  free(tableNumber: number): Observable<void> {
    return this.apiService.post(`table/${tableNumber}/free`, {})
  }

  assign(tableNumber: number): Observable<void> {
    return this.apiService.post(`table/${tableNumber}/assign`, {})
  }

}
