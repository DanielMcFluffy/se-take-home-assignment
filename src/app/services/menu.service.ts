import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuSection: 'food' | 'drink' | 'all' | 'empty' = 'all';

  constructor() { 
    if (window.location.href.includes('orders')) {
      this.menuSection = 'empty';
    }
  }

  setMenuSection(section: 'food' | 'drink' | 'all' | 'empty') {
    this.menuSection = section;
  }

}

