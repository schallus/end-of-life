import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      title: 'Products',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
