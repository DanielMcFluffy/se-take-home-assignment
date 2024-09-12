import { Injectable } from '@angular/core';
import { BotService } from './bot.service';
import { OrderService } from './order.service';
import { filter, from, groupBy, mergeMap, Observable, withLatestFrom } from 'rxjs';
import { Bot, Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  bots$!: Observable<Bot[]>;
  orders$!: Observable<Order[]>;
  botCount$!: Observable<number>;

  botCounter = 1;

  constructor(
    private _botService: BotService,
    private _orderService: OrderService
  ) {
    this.bots$ = this._botService.bots$;
    this.orders$ = this._orderService.orders$;
    this.botCount$ = this._botService.botCount$;
   }

  queue$ = from(this.orders$).pipe(
    filter(order => !!order),
    withLatestFrom(this.botCount$),
    groupBy(([order, botCount]) => this.botCounter++ % botCount),
    //think about this later
  )

}
