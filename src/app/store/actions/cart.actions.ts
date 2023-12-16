import { createAction, props } from '@ngrx/store';
import { CartItem, addToCartDataType } from '../models/cart.models'; // Import your CartState interface

export const resetCart = createAction('[Cart] Reset Cart');

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<CartItem>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);


export const incrementItemInCart = createAction(
  '[Cart] Increment Item In Cart',
  props<{ productId: number }>()
);

export const decrementItemInCart = createAction(
  '[Cart] Decrement Item In Cart',
  props<{ productId: number }>()
);



