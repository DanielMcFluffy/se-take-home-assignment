import { Component, input } from '@angular/core';
import { Bot } from '../../models';

@Component({
  selector: 'app-bot-card',
  standalone: true,
  imports: [],
  templateUrl: './bot-card.component.html',
  styleUrl: './bot-card.component.scss',
})
export class BotCardComponent {
  bot = input.required<Bot>();
}
