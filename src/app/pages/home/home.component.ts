import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/base/menu.service';
import { AuthService } from '../../services/base/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  menuService = inject(MenuService);
  authService = inject(AuthService);

  title = 'Welcome to McDonald\'s!';

  constructor() {
    this.authService.enableManagerMode();
  }

  showMenu() {
    this.menuService.setMenuSection('all');
    this.authService.disableManagerMode();
  }
}
