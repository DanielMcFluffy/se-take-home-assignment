import { Component, inject, input } from '@angular/core';
import { MenuItem } from '../../models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss'
})
export class MenuCardComponent {

  menu = input.required<MenuItem>();


}
