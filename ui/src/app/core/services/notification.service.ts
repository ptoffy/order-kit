import { Injectable } from '@angular/core';
import { Socket, io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  socket: Socket
  constructor() {
    this.socket = io('http://localhost:3000')
  }

  /**
   * Notify the cooks that a new food order has been placed.
   * @param tableNumber The table number that placed the order.
   */
  notifyCooks(tableNumber: number) {
    this.socket.emit('newFoodOrder', tableNumber)
  }

  /**
   * Notify the bartenders that a new drink order has been placed.
   * @param tableNumber The table number that placed the order.
   */
  notifyBartenders(tableNumber: number) {
    this.socket.emit('newDrinkOrder', tableNumber)
  }

  /**
   * Notify the waiters 
   * @param tableNumber 
   */
  notifyWaiters(tableNumber: number) {
    this.socket.emit('orderReady', tableNumber)
  }
}
