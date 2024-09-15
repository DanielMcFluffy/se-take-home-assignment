import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  isManager = signal(false);

  constructor() {
    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => 
      this.isManager.set(
        window.location.href.includes('manager') ||
        window.location.href.includes('home') ||
        window.location.href.includes('orders')));
  }
}
