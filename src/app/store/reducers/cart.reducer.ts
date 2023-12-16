import { createReducer, on, Action } from '@ngrx/store';
import { addToCart, removeFromCart, incrementItemInCart, decrementItemInCart, resetCart } from '../actions/cart.actions';
import { CartState } from '../models/cart.models'; // Import your CartState interface

const initialState: CartState = {
  items: [],
};


const _cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { productId, quantity, productName, productPrice, cartImg, currency }) => {
    // Check if the product already exists in the cart
    const existingCartItemIndex = state.items.findIndex(item => item.productId === productId);
  
    if (existingCartItemIndex !== -1) {
      // Product exists in the cart; increment the quantity of that item
      const updatedItems = state.items.map((item, index) => {
        if (index === existingCartItemIndex) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
  
      return {
        ...state,
        items: updatedItems,
      };
    } else {
      // Product doesn't exist in the cart; add a new item
      return {
        ...state,
        items: [
          ...state.items,
          { productId, quantity, productName, productPrice, cartImg, currency },
        ],
      };
    }
  }),
  on(removeFromCart, (state, { productId }) => {
    // Your remove from cart logic here
    return {
      ...state,
      // Update your state accordingly, for example:
      items: state.items.filter(item => item.productId !== productId),
    };
  }),

  on(incrementItemInCart, (state, { productId }) => {

    const getCartItemByIndex = state.items.findIndex(item => item.productId === productId);
    const updatedItems = state.items.map((item, index) => {
      if (index === getCartItemByIndex) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      items: updatedItems,
    };
  }),

  on(decrementItemInCart, (state, { productId }) => {
    let trackQuantity = 1;
     const getCartItemByIndex = state.items.findIndex(item => item.productId === productId);
      const updatedItems = state.items.map((item, index) => {
       
        if (index === getCartItemByIndex) {
          if(item.quantity === 1){
            trackQuantity = 0; //means empty
          }else{
            trackQuantity = 1; //means not empty
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          
        }
        return item;
      });


      if(trackQuantity === 0){
        return {
          ...state,
          // Update your state accordingly, for example:
          items: state.items.filter(item => item.productId !== productId),
        }; 
      }else{
        return {
          ...state,
          items: updatedItems,
        };
      }
      
  }),
  on(resetCart, () => {
    // Reset the entire cart
    return initialState;
  })

);

export function cartReducer(state: CartState | undefined, action: Action) {
  return _cartReducer(state, action);
}
