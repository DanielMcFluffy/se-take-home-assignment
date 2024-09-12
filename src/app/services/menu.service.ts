import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuSection: 'food' | 'drink' | 'all' = 'all';

  constructor() { }

  setMenuSection(section: 'food' | 'drink' | 'all') {
    this.menuSection = section;
  }

}

