import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MenuItem, MenuItemCategory } from '../models/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private apiService: ApiService) { }

  list(category: MenuItemCategory | null = null): Observable<MenuItem[]> {
    if (category)
      return this.apiService.get(`item?category=${category}`)
    return this.apiService.get('item')
  }
}
