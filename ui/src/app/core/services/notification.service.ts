import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Socket, io } from "socket.io-client"
import { Order } from '../models/order.model'
import { AuthService } from './auth.service'
import { UserRole } from '../models/user.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket
  private _notifications = new BehaviorSubject<string[]>([])
  private orderUpdateSubject = new Subject<void>()
  public readonly notifications$ = this._notifications.asObservable()
  public readonly orderUpdate$ = this.orderUpdateSubject.asObservable()

  constructor(
    private authService: AuthService
  ) {
    this.socket = io(environment.apiUrl)
    this.authService.logout$.subscribe(() => {
      this.emptyNotifications()
      this.socket.disconnect()
    })
  }

  showNotification(message: string) {
    const currentNotifications = [...this._notifications.value, message]
    this._notifications.next(currentNotifications)
  }

  removeNotification(message: string) {
    const currentNotifications = this._notifications.value
    const index = currentNotifications.indexOf(message)
    if (index > -1) {
      currentNotifications.splice(index, 1)
      this._notifications.next(currentNotifications)
    }
  }

  emptyNotifications() {
    this._notifications.next([])
  }

  triggerOrderUpdate() {
    this.orderUpdateSubject.next()
  }

  /**
   * Notify the cooks that a new food order has been placed.
   */
  onNewFoodOrder() {
    return new Observable((observer) => {
      this.socket.on('new-food-order', (order) => {
        if (this.authService.getCurrentUserRole() === UserRole.Cook)
          observer.next(order)
      })
    })
  }

  /**
   * Notify the bartenders that a new drink order has been placed.
   */
  onNewDrinkOrder() {
    return new Observable((observer) => {
      this.socket.on('new-drink-order', (order) => {
        if (this.authService.getCurrentUserRole() === UserRole.Bartender)
          observer.next(order)
      })
    })
  }

  /**
   * Notify the waiters that an order is ready to be served.
   */
  onOrderReady(): Observable<Order> {
    return new Observable((observer) => {
      this.socket.on('order-ready', (order: Order) => {
        if (this.authService.getCurrentUserRole() === UserRole.Waiter)
          observer.next(order)
      })
    })
  }

  onOrderStatusChange(): Observable<Order> {
    return new Observable((observer) => {
      this.socket.on('order-status-change', (order: Order) => {
        const currentRole = this.authService.getCurrentUserRole()
        if (currentRole === UserRole.Waiter || currentRole === UserRole.Cashier)
          observer.next(order)
      })
    })
  }
}
