import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  addProduct,
  addProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  loadProducts,
  loadProductsSuccess,
} from '../actions/product.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap(() =>
        this.productsService.getAllProducts().pipe(
          map((data) => loadProductsSuccess({ products: data })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      exhaustMap(({ product }) =>
        this.productsService.addProduct(product).pipe(
          map((data) => addProductSuccess({ product: data })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      exhaustMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
          map(() => deleteProductSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
