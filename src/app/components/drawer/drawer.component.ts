import { Component } from '@angular/core';
import { CartCardComponent } from '../cart-card/cart-card.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CartCardComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

}
