import { Component, inject } from '@angular/core';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { QueueService } from '../../services/queue.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  queueService = inject(QueueService);

  pendingQueues = toSignal(this.queueService.priorityQueue$);
  ongoingQueues = toSignal(this.queueService.ongoingQueue$);
  processedQueues = toSignal(this.queueService.processedQueue$);
}
