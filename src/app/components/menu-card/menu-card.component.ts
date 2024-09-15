import { Component, inject, input } from '@angular/core';
import { MenuItem } from '../../models';
import { CartService } from '../../services/base/cart.service';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss'
})
export class MenuCardComponent {

  cartService = inject(CartService);
  menu = input.required<MenuItem>();

  addToCart() {
    this.cartService.addToCart(this.menu());
  }

}
