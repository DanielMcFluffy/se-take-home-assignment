import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DrawerComponent } from './components/drawer/drawer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'take-home';
  router = inject(Router);  
  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe(() => this.isManager.set(window.location.href.includes('manager') || window.location.href.includes('home') || window.location.href.includes('orders')));
  }

  isManager = signal(false);
}
