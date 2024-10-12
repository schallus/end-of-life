import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from '../../actions/product.actions';
import { Product } from '../../models';
import { ProductState } from '../../reducers/product.reducer';
import { selectAllProducts } from '../../selectors/product.selectors';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  allProducts$: Observable<Product[]>;

  constructor(private store: Store<ProductState>) {
    this.allProducts$ = this.store.select(selectAllProducts);

    this.store.dispatch(loadProducts());
  }
}
