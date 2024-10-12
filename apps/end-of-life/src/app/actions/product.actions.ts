import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Product } from '../models';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: Product[] }>());
export const setProducts = createAction('[Product] Set Products', props<{ products: Product[] }>());
export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());
export const setProduct = createAction('[Product] Set Product', props<{ product: Product }>());
export const upsertProduct = createAction('[Product] Upsert Product', props<{ product: Product }>());
export const addProducts = createAction('[Product] Add Products', props<{ products: Product[] }>());
export const upsertProducts = createAction('[Product] Upsert Products', props<{ products: Product[] }>());
export const updateProduct = createAction('[Product] Update Product', props<{ update: Update<Product> }>());
export const updateProducts = createAction('[Product] Update Products', props<{ updates: Update<Product>[] }>());
export const mapProduct = createAction('[Product] Map Product', props<{ entityMap: EntityMapOne<Product> }>());
export const mapProducts = createAction('[Product] Map Products', props<{ entityMap: EntityMap<Product> }>());
export const deleteProduct = createAction('[Product] Delete Product', props<{ id: string }>());
export const deleteProducts = createAction('[Product] Delete Products', props<{ ids: string[] }>());
export const deleteProductsByPredicate = createAction(
  '[Product] Delete Products By Predicate',
  props<{ predicate: Predicate<Product> }>()
);
export const clearProducts = createAction('[Product] Clear Products');
