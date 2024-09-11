import { Injectable } from '@angular/core';
import { MenuItem } from '../models';

const Menus: MenuItem[] = [
  {
    id: 1,
    name: 'Item 1',
    price: 10,
    category: 'food'
  },
  {
    id: 2,
    name: 'Item 2',
    price: 20,
    category: 'drink'
  },
  {
    id: 3,
    name: 'Item 3',
    price: 30,
    category: 'other'
  },
  {
    id: 4,
    name: 'Item 4',
    price: 40,
    category: 'food'
  }
];

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenus(): MenuItem[] {
    return Menus;
  }

  getMenu(id: number): MenuItem {
    return Menus.find(menu => menu.id === id)!;
  }

  addMenu(menu: MenuItem): void {
    Menus.push(menu);
  }

  updateMenu(menu: MenuItem): void {
    const index = Menus.findIndex(m => m.id === menu.id);
  }

  deleteMenu(id: number): void {
    const index = Menus.findIndex(m => m.id === id);
    Menus.splice(index, 1);
  }
}

