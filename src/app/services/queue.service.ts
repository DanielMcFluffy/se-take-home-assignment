import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { Queue } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  _vipQueue = new BehaviorSubject<Queue[]>([]);
  _normalQueue = new BehaviorSubject<Queue[]>([]);

  vipQueue$ = this._vipQueue.asObservable();
  normalQueue$ = this._normalQueue.asObservable();

  priorityQueue$ = combineLatest([
    this.vipQueue$.pipe(startWith([])),
    this.normalQueue$.pipe(startWith([])),
  ]).pipe(
    map(([vipOrders, normalOrders]) => [...vipOrders, ...normalOrders]),
  )

  _processedQueue = new BehaviorSubject<Queue[]>([]);
  processedQueue$ = this._processedQueue.asObservable();

  addQueue(order: Queue) {
    if (order.vip) {
      this._vipQueue.next([...this._vipQueue.getValue(), order]);
    } else {
      this._normalQueue.next([...this._normalQueue.getValue(), order]);
    }
  }

  removeQueue(order: Queue) {
    if (order.vip) {
      this._vipQueue.next(this._vipQueue.getValue().filter(o => o.id !== order.id));
    } else {
      this._normalQueue.next(this._normalQueue.getValue().filter(o => o.id !== order.id));
    }
  }
}
