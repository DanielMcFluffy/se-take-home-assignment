import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CartService { 

  cart = signal<MenuItem[]>([]);

  addToCart(item: MenuItem) {
    this.cart.update(x => [...x, {...item, quantity: 1,}]);
  }

  popCart() {
    this.cart.update(x => x.slice(0, x.length - 1));
  }

  clearCart() {
    this.cart.set([]);
  }
}
