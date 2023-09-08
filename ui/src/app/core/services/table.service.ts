import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Table } from '../models/table.model'

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private basePath = 'tables'

  constructor(private apiService: ApiService) { }

  list(waiterOnly: boolean = false): Observable<Table[]> {
    return this.apiService.get(`${this.basePath}?waiterOnly=${waiterOnly}`)
  }

  occupy(tableNumber: number, peopleCount: number): Observable<void> {
    return this.apiService.post(`${this.basePath}/${tableNumber}/occupy`, { peopleCount })
  }

  free(tableNumber: number): Observable<void> {
    return this.apiService.post(`${this.basePath}/${tableNumber}/free`, {})
  }

  assign(tableNumber: number): Observable<void> {
    return this.apiService.post(`${this.basePath}/${tableNumber}/assign`, {})
  }
}
