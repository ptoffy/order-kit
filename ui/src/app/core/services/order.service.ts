import { Injectable } from "@angular/core"
import { ApiService } from "./api.service"
import { Observable } from "rxjs"
import { Order, OrderStatus } from "../models/order.model"
import { BestSellingItemResponse, CreateOrderRequest } from "../dtos/order.dto"

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private basePath = 'orders'
  constructor(private apiService: ApiService) { }

  list(
    status: OrderStatus | null = null,
    tableNumber: number | null = null
  ): Observable<Order[]> {
    let query = this.basePath
    const queryParams = []
    if (status !== null) {
      queryParams.push(`status=${status}`)
    }
    if (tableNumber !== null) {
      queryParams.push(`tableNumber=${tableNumber}`)
    }
    if (queryParams.length) {
      query += `?${queryParams.join('&')}`
    }
    return this.apiService.get(query);
  }


  create(order: CreateOrderRequest): Observable<void> {
    return this.apiService.post(this.basePath, order)
  }

  update(order: Order): Observable<void> {
    return this.apiService.post(`${this.basePath}/${order._id}/update`, order)
  }

  updateBulk(orders: Order[]): Observable<void> {
    return this.apiService.post(`${this.basePath}/update-bulk`, { orders })
  }

  fetchBudgetForDay(date: string): Observable<number> {
    return this.apiService.get(`${this.basePath}/budget?date=${date}`)
  }

  fetchBestSellingItems(): Observable<BestSellingItemResponse[]> {
    return this.apiService.get(`${this.basePath}/best-selling-items`)
  }
}
