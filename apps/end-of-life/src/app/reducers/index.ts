import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.states';
import { productReducer } from './product.reducer';

export const reducers: ActionReducerMap<AppState> = {
  productState: productReducer,
};
