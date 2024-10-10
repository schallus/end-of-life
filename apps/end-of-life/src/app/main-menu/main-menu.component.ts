import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  menuItems = [
    {
      label: 'Dashboard',
      routerLink: '/dashboard',
    },
    {
      label: 'Product management',
      routerLink: '/products',
    },
  ];
}
