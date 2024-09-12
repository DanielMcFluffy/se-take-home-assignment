import { Component, inject } from '@angular/core';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CartCardComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  cart = inject(CartService);

  addToCart() {
    this.cart.clearCart();
  }
}
