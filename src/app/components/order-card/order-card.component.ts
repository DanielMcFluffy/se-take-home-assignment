import { AfterViewInit, Component, computed, inject, input } from '@angular/core';
import { Queue, QueueStatus } from '../../models';
import { QueueService } from '../../services/queue.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent implements AfterViewInit {
  
  queueService = inject(QueueService);
  ongoingQueue = toSignal(this.queueService.ongoingQueue$);
  isOngoing = computed(() => this.ongoingQueue()?.includes(this.queue()));
  queue = input.required<Queue>();
  completedQueue!: boolean;
  
  ngAfterViewInit(): void {
    this.completedQueue = this.queue().status === QueueStatus.Completed;
  }
  popQueue() {
    this.queueService.removeQueue(this.queue());
  }

  popCompleteQueue() {
    this.queueService.removeQueue(this.queue());
    this.queueService._processedQueue.next([...this.queueService._processedQueue.getValue()].filter(x => x.id !== this.queue().id))
  }

}
