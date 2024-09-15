import { Injectable } from '@angular/core';
import { MenuSection } from '../../components/sidebar/sidebar.component';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuSection: MenuSection = 'all';

  constructor() { 
    if (window.location.href.includes('orders')) {
      this.menuSection = 'empty';
    }
  }

  setMenuSection(section: MenuSection) {
    this.menuSection = section;
  }

}

