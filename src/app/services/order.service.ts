import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  addOrder(order: Order): void {
    this.ordersSubject.next([...this.ordersSubject.value, order]);
  }
}
