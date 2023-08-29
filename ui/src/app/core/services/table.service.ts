import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private apiService: ApiService) { }

  list(): Observable<Table[]> {
    return this.apiService.get('table');
  }

}
