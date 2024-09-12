import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Bot } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor() { }

  botsSubject = new BehaviorSubject<Bot[]>([]);
  bots$ = this.botsSubject.asObservable();
  botCount$ = this.bots$.pipe(
    map(x => x.length)
  )
}
