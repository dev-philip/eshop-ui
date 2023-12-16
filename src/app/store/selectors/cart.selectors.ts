import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../models/cart.models'; // Import your CartState interface

const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);