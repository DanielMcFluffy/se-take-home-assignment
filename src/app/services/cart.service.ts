import { inject, Injectable, signal } from '@angular/core';
import { OrderService } from './order.service';
import { MenuItem, OrderItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService { 
  orderService = inject(OrderService);

  cart = signal<OrderItem[]>([]);

  addToCart(item: MenuItem) {
  //   const existing = this.cart().find(i => i.id === item.id);
  //   if (existing) {
  //     existing.quantity++;
  //   } else {
  //     this.cart.update(x => [...x, {...item, quantity: 1}]);
  //   }
  this.cart.update(x => [...x, {...item, quantity: 1}]);
  }

  clearCart() {
    this.cart.set([]);
  }
}
