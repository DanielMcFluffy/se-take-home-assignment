import { Component, inject, signal } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MenuService } from '../../services/menu.service';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { MenuItem } from '../../models';
import { SearchService } from '../../services/search.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SearchBarComponent, MenuCardComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  menuService = inject(MenuService);
  searchService = inject(SearchService);
  cart = inject(CartService);
  
  constructor() {
    this.searchService.searchTerm$.subscribe(x => this.allMenu = 
      x ? this.allMenu.filter(y => y.name.toLowerCase().includes(x.toLowerCase())) 
      : ALL_MENU);

    this.searchService.searchTerm$.subscribe(x => this.foodMenu = 
      x ? this.foodMenu.filter(y => y.name.toLowerCase().includes(x.toLowerCase())) 
      : FOOD_MENU);

    this.searchService.searchTerm$.subscribe(x => this.drinksMenu = 
      x ? this.drinksMenu.filter(y => y.name.toLowerCase().includes(x.toLowerCase())) 
      : DRINKS_MENU);
  }


  allMenu: MenuItem[] = ALL_MENU;
  foodMenu: MenuItem[] = FOOD_MENU; 
  drinksMenu: MenuItem[] = DRINKS_MENU;

  addToCart(item: MenuItem) {
    this.cart.addToCart(item);
  }
}


const FOOD_MENU: MenuItem[] = [{
  id: 1,
  name: 'McChicken',
  category: 'food',
  price: 10.99,
  image: 'burder.png'
},
{
  id: 2,
  name: 'McBread',
  category: 'food',
  price: 5.99,
  image: 'McBread.png'
},
{
  id: 3,
  name: 'McMc',
  category: 'other',
  price: 15.99,
  image: 'McMc.jpeg'
}] 

const DRINKS_MENU: MenuItem[] = [{
  id: 4,
  name: 'Coke',
  category: 'drink',
  price: 5.99,
  image: 'coke.jpeg'
},
{
  id: 5,
  name: 'McCafe',
  category: 'drink',
  price: 8.99,
  image: 'McCafe.jpeg'
},] 

const ALL_MENU = FOOD_MENU.concat(DRINKS_MENU);
