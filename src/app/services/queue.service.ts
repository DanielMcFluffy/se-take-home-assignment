import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, skip, startWith, tap } from 'rxjs';
import { Queue } from '../models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  queueNumber = 0;
  
  _vipQueue = new BehaviorSubject<Queue[]>([]);
  vipQueue$ = this._vipQueue.asObservable();

  _normalQueue = new BehaviorSubject<Queue[]>([]);
  normalQueue$ = this._normalQueue.asObservable();
  
  _ongoingQueue = new BehaviorSubject<Queue[]>([]);
  ongoingQueue$ = this._ongoingQueue.asObservable();

  _processedQueue = new BehaviorSubject<Queue[]>([]);
  processedQueue$ = this._processedQueue.asObservable();

  priorityQueue$ = combineLatest([
    this.vipQueue$.pipe(startWith([])),
    this.normalQueue$.pipe(startWith([])),
    this.ongoingQueue$.pipe(startWith([])),
    this.processedQueue$.pipe(startWith([])),
  ]).pipe(
    skip(1),
    map(
      ([vipOrders, normalOrders, ongoingOrders, processedOrders]: [Queue[], Queue[], Queue[], Queue[]]) => [...vipOrders, ...normalOrders].filter(x => !processedOrders.includes(x) && !ongoingOrders.includes(x))
    ),
  )
  priorityQueue = toSignal(this.priorityQueue$);

  addQueue(queue: Queue) {
    if (queue.vip) {
      // Avoid duplicate entries
      const currentVipQueues = this._vipQueue.getValue();
      if (!currentVipQueues.some(q => q.id === queue.id)) {
        this._vipQueue.next([...currentVipQueues, queue]);
      }
    } else {
      const currentNormalQueues = this._normalQueue.getValue();
      if (!currentNormalQueues.some(q => q.id === queue.id)) {
        this._normalQueue.next([...currentNormalQueues, queue]);
      }
    }
  }

  removeQueue(queue: Queue) {
    if (queue.vip) {
      this._vipQueue.next(this._vipQueue.getValue().filter(o => o.id !== queue.id));
    } else {
      this._normalQueue.next(this._normalQueue.getValue().filter(o => o.id !== queue.id));
    }
  }

  processQueue(): Queue | undefined {
    let frontQueue = this.priorityQueue()?.shift();
    if (!frontQueue) return;
    this._ongoingQueue.next([...this._ongoingQueue.getValue(), frontQueue]);
    return frontQueue;
  }

  completeQueue(queue: Queue): Queue {
    this._ongoingQueue.next(this._ongoingQueue.getValue().filter(o => o.id !== queue.id));
    this._processedQueue.next([...this._processedQueue.getValue(), queue]);
    return queue;
  };
}
