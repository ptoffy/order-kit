import { Injectable } from "@angular/core"
import { ApiService } from "./api.service"
import { Observable } from "rxjs"
import { Order, OrderStatus } from "../models/order.model"
import { MenuItemCategory } from "../models/item.model"

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private apiService: ApiService) { }

  list(status: OrderStatus): Observable<Order[]> {
    return this.apiService.get(`order?status=${status}`)
  }

  create(order: Order): Observable<void> {
    return this.apiService.post(`order`, { order })
  }

  update(order: Order): Observable<void> {
    return this.apiService.post(`order/${order._id}/update`, order)
  }

  listForWaiter(waiterId: string): Observable<Order[]> {
    return this.apiService.get(`order?waiterId=${waiterId}`)
  }
}
