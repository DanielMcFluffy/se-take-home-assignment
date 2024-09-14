import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCardComponent {

  orderNumber = input<number>();

}
