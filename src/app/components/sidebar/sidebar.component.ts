import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/base/menu.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/base/auth.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { BotService } from '../../services/bot.service';

export type MenuButton = {
  label: string;
  value: MenuSection;
}

export type MenuSection = 'food' | 'drink' | 'all' | 'empty';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  router = inject(Router);
  menuService = inject(MenuService);
  authService = inject(AuthService);
  botService = inject(BotService);

  isManager = toSignal(
    toObservable(this.authService.isManager).pipe(
    filter(() => window.location.href.includes('manager'))
  )
);

  options: MenuButton[] = [
    { label: 'All', value: 'all' },
    { label: 'Food', value: 'food' },
    { label: 'Drinks', value: 'drink' }
  ] 
  setMenuSection(section: MenuSection) {
    this.menuService.setMenuSection(section);
  }

  navigateToOrder() {
    if (window.location.href.includes('customer')) {
      this.menuService.setMenuSection('empty');
    }
  }

  clearMenu() {
    this.menuService.setMenuSection('empty');
  }

  addBot() {
    this.botService.addBot();
  }

  removeBot() {
    this.botService.removeBot();
  }

}
