import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


// just a way to show the app-drawer if you're a customer
// ideally do it in a router event through route-guard with guardchecknavigation event
  isManager = signal(false);

  enableManagerMode() {
    this.isManager.set(true);
  }

  disableManagerMode() {
    this.isManager.set(false);
  }
}
