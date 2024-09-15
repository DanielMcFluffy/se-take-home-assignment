import { Component, computed, inject } from '@angular/core';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { CartService } from '../../services/base/cart.service';
import { QueueService } from '../../services/queue.service';
import {  Queue } from '../../models';
import { Router } from '@angular/router';
import { MenuService } from '../../services/base/menu.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CartCardComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

  cartService = inject(CartService);
  queueService = inject(QueueService);
  menuService = inject(MenuService);
  router = inject(Router);

  queueNumber = this.queueService.queueNumber;
  cartNumber = computed(() => this.cartService.cart().length);

  addOrder(vip: boolean) {

    if (this.cartNumber() === 0) {
      return;
    }
    let queue = new Queue(vip)
    this.queueService.addQueue(queue);

    this.cartService.clearCart(); //for simplicity, cart amount doesn't matter
    this.menuService.setMenuSection('empty')
    this.router.navigate(['demo', 'orders']);
  }
}
