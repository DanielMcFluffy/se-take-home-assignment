import { computed, inject, Injectable } from '@angular/core';
import { Bot } from '../models';
import { BehaviorSubject } from 'rxjs';
import { QueueService } from './queue.service';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  _bots: Bot[] = []
  bots = new BehaviorSubject<Bot[]>(this._bots)

  queueService = inject(QueueService);

  addBot() {
    let bot = new Bot()
    this.startShift(bot)

    this._bots.push(bot)
    this.bots.next(this._bots)
  }

  removeBot() {
    let bot = this._bots.pop()
    if (!bot) return

    bot.cancel.next(true)
    Bot.botCount--
    this.bots.next(this._bots)
  }

  startShift(bot: Bot) {
    this.processQueue(bot)
    this.completedQueue(bot)
    this.cancelledQueue(bot)
  }

  processQueue(bot: Bot) {
    let processJob = bot.process.subscribe(isProcessing => {
      // unsubscribe when bot is not active
      if (!bot.operating) processJob.unsubscribe()

      if (isProcessing) return

      // continuously search for queues
      let interval = setInterval(() => {
        if (bot.operating) {
          let order = this.queueService.processQueue()
          if (!order) return

          bot.process.next(true)
          bot.processQueue(order)
        }
        clearInterval(interval)
      })
    })
  }

  completedQueue(bot: Bot) {
    let completedJob = bot.complete.subscribe(isCompleted => {

      if (!bot.operating) completedJob.unsubscribe()

      if (!isCompleted) return

      let order = bot.completeOrder()
      if (order) this.queueService.completeQueue(order)

      bot.process.next(false)
    })
  }

  cancelledQueue(bot: Bot) {
    let cancelJob = bot.cancel.subscribe(isCancelled => {
      if (!isCancelled) return

      bot.operating = false
      bot.process.next(false)
      bot.complete.next(false)

      // add back order to pending 
      let order = bot.cancelProcessingQueue()
      const filteredQueue = this.queueService._ongoingQueue.getValue().filter(x => x.id !== order?.id)
      this.queueService._ongoingQueue.next(filteredQueue)
      const currentQueue = computed(() => this.queueService.priorityQueue()!.filter(x => x.id !== order?.id))
      if (order) this.queueService.addQueue(order)

      cancelJob.unsubscribe()
    })
  }
}
