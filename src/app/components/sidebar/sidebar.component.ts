import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

export type MenuButton = {
  label: string;
  value: 'food' | 'drink' | 'all';
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  options: MenuButton[] = [
    { label: 'All', value: 'all' },
    { label: 'Food', value: 'food' },
    { label: 'Drinks', value: 'drink' },
  ]
  router = inject(Router);
  menuService = inject(MenuService);

  setMenuSection(section: 'food' | 'drink' | 'all') {
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

}
