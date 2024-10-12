import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule, ProductFormComponent, ProductsListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {}
