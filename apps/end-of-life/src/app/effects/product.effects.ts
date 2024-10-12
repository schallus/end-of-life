import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadProducts, loadProductsSuccess } from '../actions/product.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductEffects {
  constructor(private readonly actions$: Actions, private productsService: ProductsService) {}
  readonly loadAllArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productsService.getAllProducts().pipe(map((data) => loadProductsSuccess({ products: data })))
      )
    )
  );
}
