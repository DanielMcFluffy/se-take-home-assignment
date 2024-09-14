import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  menuService = inject(MenuService);

  showMenu() {
    this.menuService.setMenuSection('all');
  }
}
