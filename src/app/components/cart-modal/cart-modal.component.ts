import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../store/selectors/cart.selectors';
import { removeFromCart, incrementItemInCart, decrementItemInCart } from '../../store/actions/cart.actions';
import { Product } from '../../types/product-types';
import {CartItem, CartItemId } from 'src/app/store/models/cart.models';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartModalService } from '../../services/cart-modal/cart-modal.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  animations: [
    trigger('cartBump', [
      state('bumped', style({ transform: 'scale(1.2)' })),
      transition('* => bumped', [
        animate('300ms ease-out'),
        style({ transform: 'scale(1)' }),
      ]),
    ]),
  ],
})
export class CartModalComponent implements OnInit{

  cartBumpState = ''; // Initial state for the animation
  noOfItemInCart = 0; //Number of item in class

  products: Product[] | undefined;

  baseUrl:string = environment.adminServerUrl + "/";

  constructor(private store: Store, private cartModalService : CartModalService, private router: Router) {}
  
  productsInCart$ = this.store.select(selectCartItems); 

   // For animation - Initialize the property to false
   isAddedToCart = false;
   

  activateCartAnimation(){
    this.isAddedToCart = true;
    // Reset the animation state after a short delay (you can adjust the delay as needed)
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 500);
  }
  

  checkoutHandler(){
    this.router.navigate(['/checkout']);
  }
  ngOnInit() {

     // Subscribe to the cartItemAdded$ observable to trigger the animation
     this.cartModalService.cartItemAdded$.subscribe(() => {
      
      
      this.cartBumpState = 'bumped';
      this.activateCartAnimation();
    });

    this.productsInCart$.subscribe((cartItems) => {
        // console.log('Cart Items:', cartItems);
        this.noOfItemInCart = 0;
        for(let i = 0; i < cartItems.length; i++)
        {
          this.noOfItemInCart += cartItems[i].quantity;
        }
    });
  }

  removeFromCartHandler(productId: number){
    // alert("I am removing Item with product Id - " + productId);
    const cartItemId: CartItemId = { 
      productId: productId
    };
    this.store.dispatch(removeFromCart(cartItemId));
    this.activateCartAnimation();
  }

  incrementItemInCartHandler(productId: number){

    const cartItemId: CartItemId = { 
      productId: productId
    };
    this.store.dispatch(incrementItemInCart(cartItemId));
    this.activateCartAnimation();
  }

  decrementItemInCartHandler(productId: number){

    const cartItemId: CartItemId = { 
      productId: productId
    };

    this.store.dispatch(decrementItemInCart(cartItemId));
    this.activateCartAnimation();
  }

  getTotalPrice(cartItems: CartItem[]): string {
    if (cartItems.length === 0) {
      return '$0.00'; // Return $0.00 if the cart is empty
    }

    // Calculate the total price based on cart items and return it as a string
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.productPrice, 0);
    return `$${total.toFixed(2)}`;
  }


}
