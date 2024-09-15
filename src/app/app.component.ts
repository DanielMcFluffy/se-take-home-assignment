import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from './components/drawer/drawer.component';
import { AuthService } from './services/base/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  authService = inject(AuthService);
  isManager = this.authService.isManager;
}
