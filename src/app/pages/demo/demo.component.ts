import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent, SidebarComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  // ideally an auth identifier would be used here
  isManager = window.location.href.includes('manager');
}
