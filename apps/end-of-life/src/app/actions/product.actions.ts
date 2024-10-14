import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ProductDTO } from '../models';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: ProductDTO[] }>());
export const setProducts = createAction('[Product] Set Products', props<{ products: ProductDTO[] }>());
export const addProduct = createAction('[Product] Add Product', props<{ product: ProductDTO }>());
export const addProductSuccess = createAction('[Product] Add Product Success', props<{ product: ProductDTO }>());
export const setProduct = createAction('[Product] Set Product', props<{ product: ProductDTO }>());
export const upsertProduct = createAction('[Product] Upsert Product', props<{ product: ProductDTO }>());
export const addProducts = createAction('[Product] Add Products', props<{ products: ProductDTO[] }>());
export const upsertProducts = createAction('[Product] Upsert Products', props<{ products: ProductDTO[] }>());
export const updateProduct = createAction('[Product] Update Product', props<{ update: Update<ProductDTO> }>());
export const updateProducts = createAction('[Product] Update Products', props<{ updates: Update<ProductDTO>[] }>());
export const mapProduct = createAction('[Product] Map Product', props<{ entityMap: EntityMapOne<ProductDTO> }>());
export const mapProducts = createAction('[Product] Map Products', props<{ entityMap: EntityMap<ProductDTO> }>());
export const deleteProduct = createAction('[Product] Delete Product', props<{ id: string }>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success');
export const deleteProducts = createAction('[Product] Delete Products', props<{ ids: string[] }>());
export const deleteProductsByPredicate = createAction(
  '[Product] Delete Products By Predicate',
  props<{ predicate: Predicate<ProductDTO> }>()
);
export const clearProducts = createAction('[Product] Clear Products');
