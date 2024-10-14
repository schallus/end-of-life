import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteProduct, loadProducts } from '../../actions/product.actions';
import { ProductDTO } from '../../models';
import { selectAllProducts } from '../../selectors/product.selectors';
import { SharedModule } from '../../shared/shared.module';
import { AppState } from '../../states/app.states';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  allProducts$: Observable<ProductDTO[]>;
  displayedColumns = ['name', 'note', 'components', 'actions'];

  constructor(private store: Store<AppState>) {
    this.allProducts$ = this.store.select(selectAllProducts);

    this.store.dispatch(loadProducts());
  }

  deleteProduct(product: ProductDTO): void {
    this.store.dispatch(deleteProduct({ id: product.id! }));
  }
}
