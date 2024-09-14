import { Component } from '@angular/core';
import { OrderCardComponent } from '../../components/order-card/order-card.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

}
