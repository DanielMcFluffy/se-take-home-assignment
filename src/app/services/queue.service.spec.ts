import { TestBed } from '@angular/core/testing';
import { QueueService } from './queue.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Queue } from '../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed, EnvironmentInjector, Signal } from '@angular/core';

describe('QueueService', () => {
  let service: QueueService;
  let injector: EnvironmentInjector;

  let _vipQueue: BehaviorSubject<Queue[]>
  let vipQueue$: Observable<Queue[]>
  let vipQueue: Signal<Queue[] | undefined>

  let _normalQueue: BehaviorSubject<Queue[]>
  let normalQueue$: Observable<Queue[]>
  let normalQueue: Signal<Queue[] | undefined>

  let _ongoingQueue: BehaviorSubject<Queue[]>
  let ongoingQueue$: Observable<Queue[]>
  let ongoingQueue: Signal<Queue[] | undefined>

  let _processedQueue: BehaviorSubject<Queue[]>
  let processedQueue$: Observable<Queue[]>
  let processedQueue: Signal<Queue[] | undefined>

  let priorityQueue$: Observable<Queue[]>
  let priorityQueue: Signal<Queue[] | undefined>

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueService);
    injector = TestBed.inject(EnvironmentInjector);

    _vipQueue = service._vipQueue;
    vipQueue$ = service.vipQueue$;
    vipQueue = toSignal(vipQueue$, {injector})

    _normalQueue = service._normalQueue;
    normalQueue$ = service.normalQueue$;
    normalQueue = toSignal(normalQueue$, {injector})

    _ongoingQueue = service._ongoingQueue;
    ongoingQueue$ = service.ongoingQueue$;
    ongoingQueue = toSignal(ongoingQueue$, {injector})
    
    _processedQueue = service._processedQueue;
    processedQueue$ = service.processedQueue$;
    processedQueue = toSignal(processedQueue$, {injector})

    priorityQueue$ = service.priorityQueue$;
    priorityQueue = toSignal(priorityQueue$, {injector})
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('queues start as empty', () => {
    expect(priorityQueue()).toStrictEqual([])
  })

  it('queues should have customer when added', () => {
    let queue = new Queue(false);
    _normalQueue.next([queue])

    const queueCount = computed(() => priorityQueue()?.length)

    expect(queueCount()).toBe(1);
  })

  it('each queue id should be unique and incremental', () => {
    Queue.orderCount = 1;
    let queue1 = new Queue(false);
    let queue2: Queue | null = new Queue(true);

    expect(queue1.id).toBe(1);
    expect(queue2.id).toBe(2);

    queue2 = null
    queue2 = new Queue(false);

    expect(queue1.id).toBe(1);
    expect(queue2.id).toBe(3);
  })

  it('queues should prioritize vip customers', () => {
    let vipQueue = new Queue(true);
    let normalQueue1 = new Queue(false);
    let normalQueue2 = new Queue(false);

    _normalQueue.next([normalQueue1]);
    _normalQueue.next([normalQueue2]);
    _vipQueue.next([vipQueue]);

    const frontQueue = priorityQueue()![0];
    expect(frontQueue.vip).toBeTruthy();
  })

  it('queues must not have latest vip customer overtake the earlier ones', () => {
    let vipQueue1 = new Queue(true);
    let vipQueue2 = new Queue(true);
    let normalQueue1 = new Queue(false);
    let normalQueue2 = new Queue(false);

    _vipQueue.next([vipQueue1]);
    _normalQueue.next([normalQueue1]);
    _normalQueue.next([normalQueue2]);
    _vipQueue.next([..._vipQueue.getValue(), vipQueue2])

    const frontQueue = priorityQueue()![0];
    const secondQueue = priorityQueue()![1];
    expect(frontQueue.vip && secondQueue.vip).toBeTruthy();
  })

  it('queues must not have ongoing or processed queues', () => {
    let ongoingQueue = new Queue(false);
    let processedQueue = new Queue(true);

    _ongoingQueue.next([ongoingQueue]);
    _processedQueue.next([processedQueue]);
    _normalQueue.next([ongoingQueue]);

    const queueCount = computed(() => priorityQueue()?.length)
    expect(queueCount()).toBe(0);
  })

});
