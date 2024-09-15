import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/base/menu.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  menuService = inject(MenuService);

  title = 'Welcome to McDonald\'s!';

  showMenu() {
    this.menuService.setMenuSection('all');
  }
}
