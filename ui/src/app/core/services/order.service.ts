import { Injectable } from "@angular/core"
import { ApiService } from "./api.service"
import { Observable } from "rxjs"
import { Order, OrderStatus } from "../models/order.model"
import { CreateOrderRequest } from "../dtos/order.dto"

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private apiService: ApiService) { }

  list(status: OrderStatus, tableNumber: number | null = null): Observable<Order[]> {
    var query = `order?status=${status}`
    if (tableNumber !== null)
      query += `&tableNumber=${tableNumber}`
    return this.apiService.get(query)
  }

  create(order: CreateOrderRequest): Observable<void> {
    return this.apiService.post(`order`, order)
  }

  update(order: Order): Observable<void> {
    return this.apiService.post(`order/${order._id}/update`, order)
  }

  updateBulk(orders: Order[]): Observable<void> {
    return this.apiService.post(`order/update-bulk`, { orders })
  }

  listForWaiter(waiterId: string): Observable<Order[]> {
    return this.apiService.get(`order?waiterId=${waiterId}`)
  }
}
