import { Routes } from "@angular/router";

export const DemoRoutes: Routes = [
  {path: 'customer', loadComponent: () => import('../app/pages/customer/customer.component').then(m => m.CustomerComponent)},
  {path: 'manager', loadComponent: () => import('../app/pages/manager/manager.component').then(m => m.ManagerComponent)},
]