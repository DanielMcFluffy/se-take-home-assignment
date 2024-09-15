import { Component, inject } from '@angular/core';
import { BotCardComponent } from '../../components/bot-card/bot-card.component';
import { BotService } from '../../services/bot.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [BotCardComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  botService = inject(BotService);

  bots = this.botService._bots;

}
