import { createSelector } from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducer';
import { AppState } from '../states/app.states';

export const selectProductState = (state: AppState) => state.productState;
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
