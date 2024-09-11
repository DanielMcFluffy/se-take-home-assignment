import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'demo', loadComponent: () => import('../app/pages/demo/demo.component').then(m => m.DemoComponent),
    loadChildren: () => import('../app/demo.routes').then(m => m.DemoRoutes)},
  {path: '**', redirectTo: 'home'}
];
