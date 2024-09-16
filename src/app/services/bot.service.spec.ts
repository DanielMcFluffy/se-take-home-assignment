import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BotService } from './bot.service';
import { QueueService } from './queue.service';
import { Bot, Queue } from '../models';
import { computed, EnvironmentInjector, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


describe('BotService', () => {
  let service: BotService;
  let queueService: QueueService;
  let _bots: Bot[];

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
    service = TestBed.inject(BotService);
    injector = TestBed.inject(EnvironmentInjector);
    queueService = TestBed.inject(QueueService);

    _bots = service._bots;

    _vipQueue = queueService._vipQueue;
    vipQueue$ = queueService.vipQueue$;
    vipQueue = toSignal(vipQueue$, {injector})

    _normalQueue = queueService._normalQueue;
    normalQueue$ = queueService.normalQueue$;
    normalQueue = toSignal(normalQueue$, {injector})

    _ongoingQueue = queueService._ongoingQueue;
    ongoingQueue$ = queueService.ongoingQueue$;
    ongoingQueue = toSignal(ongoingQueue$, {injector})
    
    _processedQueue = queueService._processedQueue;
    processedQueue$ = queueService.processedQueue$;
    processedQueue = toSignal(processedQueue$, {injector})

    priorityQueue$ = queueService.priorityQueue$;
    priorityQueue = toSignal(priorityQueue$, {injector})
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('bots should start empty', () => {
    expect(_bots.length).toBe(0);
  });

  //not a requirement but I set it myself
  it('bot id should be incremental', () => {
    let bot1 = new Bot();
    let bot2 = new Bot();

    _bots.push(bot1, bot2);
    expect(_bots.length).toBe(2);
    expect(_bots[0].id).toBe(1);
    expect(_bots[1].id).toBe(2);

    _bots.pop();

    let bot3 = new Bot();
    _bots.push(bot3);
    expect(_bots[1].id).toBe(3);
  })

  it('the first bot to appear, should take the front most pending order', fakeAsync(() => {
    Queue.orderCount = 1
    let queue1 = new Queue(false);
    let queue2 = new Queue(true);

    _normalQueue.next([queue1]);
    _vipQueue.next([queue2]);

    const queueCount = computed(() => priorityQueue()?.length)
    expect(queueCount()).toBe(2);

    service.addBot();
    const bot = _bots[0]; 
    service.startShift(bot);
    expect(bot.operating).toBe(true);  
    
    tick(); //check after 1 observable emission
    expect(bot.process.getValue()).toBe(true);  
    expect(_ongoingQueue.getValue()[0]).toEqual(queue2);  
    expect(_ongoingQueue.getValue()[1]).toEqual(queue1);  

    discardPeriodicTasks();
  }));

  it('ongoing order should be moved to pending queue if bot is abruptly removed', () => {
    let queue = new Queue(false);

    _normalQueue.next([queue]);

    const queueCount = computed(() => priorityQueue()?.length)
    expect(queueCount()).toBe(1);

    service.addBot();
    const bot = _bots[0]; 
    service.startShift(bot);
    expect(bot.operating).toBe(true);  
  
    setTimeout(() => {
      expect(bot.process.getValue()).toBe(true);  

      const activeQueue = priorityQueue()![0];  
      expect(activeQueue).toEqual(queue); 
    }, 0);  // delay added to wait for any asynchronous behavior like setInterval

    setTimeout(() => {
      expect(bot.complete.getValue()).toBe(true);
    }, 3000)

    service.removeBot();

    expect(queueCount()).toBe(1);
  });
});
