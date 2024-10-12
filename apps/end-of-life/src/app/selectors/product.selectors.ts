import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<fromProduct.ProductState>('products');
export const selectProductIds = createSelector(selectProductState, fromProduct.selectProductIds);
export const selectProductEntities = createSelector(selectProductState, fromProduct.selectProductEntities);
export const selectAllProducts = createSelector(selectProductState, fromProduct.selectAllProducts);
export const selectProductTotal = createSelector(selectProductState, fromProduct.selectProductTotal);
export const selectCurrentProductId = createSelector(selectProductState, fromProduct.getSelectedProductId);
export const selectCurrentProduct = createSelector(
  selectProductEntities,
  selectCurrentProductId,
  (productEntities, productId) => productId && productEntities[productId]
);
