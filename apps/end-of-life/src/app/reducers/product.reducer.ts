import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../models';

import * as ProductActions from '../actions/product.actions';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  selectedProductId: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  // additional entity state properties
  selectedProductId: null,
});

export const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, { product }) => {
    return adapter.addOne(product, state);
  }),
  on(ProductActions.setProduct, (state, { product }) => {
    return adapter.setOne(product, state);
  }),
  on(ProductActions.upsertProduct, (state, { product }) => {
    return adapter.upsertOne(product, state);
  }),
  on(ProductActions.addProducts, (state, { products }) => {
    return adapter.addMany(products, state);
  }),
  on(ProductActions.upsertProducts, (state, { products }) => {
    return adapter.upsertMany(products, state);
  }),
  on(ProductActions.updateProduct, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(ProductActions.updateProducts, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(ProductActions.mapProduct, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(ProductActions.mapProducts, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(ProductActions.deleteProduct, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ProductActions.deleteProducts, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(ProductActions.deleteProductsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    return adapter.setAll(products, state);
  }),
  on(ProductActions.setProducts, (state, { products }) => {
    return adapter.setMany(products, state);
  }),
  on(ProductActions.clearProducts, (state) => {
    return adapter.removeAll({ ...state, selectedProductId: null });
  })
);

export const getSelectedProductId = (state: ProductState) => state.selectedProductId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of product ids
export const selectProductIds = selectIds;

// select the dictionary of product entities
export const selectProductEntities = selectEntities;

// select the array of products
export const selectAllProducts = selectAll;

// select the total product count
export const selectProductTotal = selectTotal;
