import { Injectable } from '@angular/core';
import { Order } from '../models';
import { Observable, of } from 'rxjs';

const ORDERS: Order[] = [
  {
    id: 1,
    name: 'Order 1',
    price: 100,
    type: 'normal',
    status: 'pending',
    details: [
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        quantity: 2,
        category: 'food'
      },
      {
        id: 2,
        name: 'Item 2',
        price: 20,
        quantity: 1,
        category: 'drink'
      }
    ]
  },
  {
    id: 2,
    name: 'Order 2',
    price: 200,
    type: 'vip',
    status: 'complete',
    details: [
      {
        id: 3,
        name: 'Item 3',
        price: 30,
        quantity: 3,
        category: 'other'
      },
      {
        id: 4,
        name: 'Item 4',
        price: 40,
        quantity: 2,
        category: 'food'
      }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrders(): Observable<Order[]> {
    return of(ORDERS);
  }

  getOrder(id: number): Observable<Order> {
    return of(ORDERS.find(order => order.id === id)!);
  }

  updateOrder(order: Order): Observable<Order> {
    const index = ORDERS.findIndex(o => o.id === order.id);
    ORDERS[index] = order;
    return of(order);
  }

  deleteOrder(id: number): Observable<Order[]> {
    const index = ORDERS.findIndex(order => order.id === id);
    ORDERS.splice(index, 1);
    return of(ORDERS);
  }

  createOrder(order: Order): Observable<Order> {
    order.id = ORDERS.length + 1;
    ORDERS.push(order);
    return of(order);
  }
}
