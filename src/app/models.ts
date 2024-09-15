import { BehaviorSubject } from "rxjs";

export type Status = 'pending' | 'complete' | 'error';

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: 'food' | 'drink' | 'other';
  image: string;
}

export enum QueueStatus {
  Pending = '[PENDING]',
  Ongoing = '[ONGOING]',
  Completed = '[COMPLETED]',
}

export enum BotStatus {
  Idle = '[IDLE]',
  Processing = '[PROCESSING]',
}

export class Queue {
  id: number
  status: QueueStatus
  queueDuration: number
  timeLeft: number
  vip: boolean

  static orderCount: number = 1

  constructor(vip: boolean, queueTime?: number) {
      this.id = Queue.orderCount++;
      this.vip = vip
      queueTime ? this.queueDuration = queueTime : this.queueDuration = 10;
      queueTime ? this.timeLeft = queueTime : this.timeLeft = 10;
      this.status = QueueStatus.Pending
  }

  setOngoingStatus() {
      this.timeLeft = this.queueDuration
      this.status = QueueStatus.Ongoing
  }

  setCompletedStatus() {
      this.status = QueueStatus.Completed
  }

  setPendingStatus() {
      this.status = QueueStatus.Pending
  }
}

export class Bot {
    id: number
    operating: boolean

    queue: Queue | null = null
    process = new BehaviorSubject<boolean>(false)
    complete = new BehaviorSubject<boolean>(false)
    cancel = new BehaviorSubject<boolean>(false)

    static botCount: number = 1

    constructor() {
        this.id = Bot.botCount++;
        this.operating = true;
    }

    processQueue(queue: Queue) {
        this.queue = queue
        this.queue.setOngoingStatus()

        let interval = setInterval(() => {
            if (this.queue) {
                this.queue.timeLeft--;
                if (this.queue.timeLeft !== 0) return
                this.complete.next(true)
            }
            clearInterval(interval)
        }, 1000)
    }

    cancelProcessingQueue(): Queue | null {
        let queue = this.queue
        this.queue = null
        queue?.setPendingStatus()
        return queue
    }

    completeOrder(): Queue | null {
        let queue = this.queue
        this.queue = null
        queue?.setCompletedStatus()
        return queue
    }
}



