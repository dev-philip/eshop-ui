import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/types/product-types';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../store/selectors/cart.selectors';
import { CartItem, CartItemId } from 'src/app/store/models/cart.models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { removeFromCart, resetCart } from 'src/app/store/actions/cart.actions';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit{
  
  myPromoCode: FormGroup;
  myShippingInfo: FormGroup;
  noOfItemInCart = 0; //Number of item in cart
  hasItemsInCart: boolean = false;
  products: Product[] | undefined;
  baseUrl:string = environment.adminServerUrl + "/";
  loading = false;
  itemInCart: any;


  constructor(
     private store: Store,
     private router: Router, 
     private formBuilder: FormBuilder,
     private toastr: ToastrService,
     private orderService : OrderService,
     ) {
    this.myPromoCode = this.formBuilder.group({
      promoCode: ['', Validators.required]
    });

    this.myShippingInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      zip: ['', Validators.required],

      country: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  productsInCart$ = this.store.select(selectCartItems); 

  ngOnInit(): void {
    this.productsInCart$.subscribe((cartItems:any) => {
      // console.log('Cart Items:', cartItems);
      this.noOfItemInCart = 0;
      for(let i = 0; i < cartItems.length; i++)
      {
        this.noOfItemInCart += cartItems[i].quantity;
      }
      this.hasItemsInCart = cartItems.length > 0;
      this.itemInCart = cartItems;
    });
  }

   validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmitShippingForm(){
    const firstName = this.myShippingInfo.get('firstName')?.value;
    const lastName = this.myShippingInfo.get('lastName')?.value;
    const email = this.myShippingInfo.get('email')?.value;
    const address = this.myShippingInfo.get('address1')?.value;
    const address2 = this.myShippingInfo.get('address2')?.value;
    const country = this.myShippingInfo.get('country')?.value;
    const state = this.myShippingInfo.get('state')?.value;
    const zip = this.myShippingInfo.get('zip')?.value;

    if(firstName === "" ){
      this.toastr.error('First name is required');
      return
    }


    if(lastName === "" ){
      this.toastr.error('Last name required');
      return
    }

    if(email === "" ){
      this.toastr.error('Email is required');
      return
    }

    if (!this.validateEmail(email)) {
      console.log("Invalid email");
    }

    if( address === ""){
      this.toastr.error('Address is required');
      return
    }

    if(country === "" ){
      this.toastr.error('Country is required');
      return
    }

    if(state === ""){
      this.toastr.error('State is required');
      return
    }

    if( zip === "" ){
      this.toastr.error('Zip Code is required');
      return
    }

    const orders = {
      firstName,
      lastName,
      primaryEmail: email,
      ship_address1: address,
      ship_address2: address2,
      ship_country: country,
      ship_state: state,
      ship_zip: zip,
      itemIncart : this.itemInCart
    }

   
  const modifiedOrders = [];

  for (let i = 0; i < orders.itemIncart.length; i++) {
      const item = orders.itemIncart[i];

      const modifiedOrder = {
          firstName: orders.firstName,
          lastName: orders.lastName,
          primaryEmail: orders.primaryEmail,
          ship_address1: orders.ship_address1,
          ship_address2: orders.ship_address2,
          ship_country: orders.ship_country,
          ship_state: orders.ship_state,
          ship_zip: orders.ship_zip,
          productOrderid: item.productId,
          productCount: item.quantity
      };

      modifiedOrders.push(modifiedOrder);
  }

  console.log(modifiedOrders);
  

    this.orderService.saveOrder(modifiedOrders).subscribe(
      (response) => {
        console.log(response);
        if(response.status){  //if true
          this.toastr.success('Order recevied successfully');
          this.myShippingInfo.reset();
          this.store.dispatch(resetCart());
        }else{
          this.toastr.error('Error encountered');
        }
      },
      (error) => {
        console.error('Error logging In:', error);
        // Handle errors here
      }
    ).add(() => {
      this.loading = false;
      
    });
   
  }

  removeFromCartHandler(productId: number){
    // alert("I am removing Item with product Id - " + productId);
    const cartItemId: CartItemId = { 
      productId: productId
    };
    this.store.dispatch(removeFromCart(cartItemId));
  }

  getTotalPrice(cartItems: CartItem[]): string {
    if (cartItems.length === 0) {
      return '$0.00'; // Return $0.00 if the cart is empty
    }

    // Calculate the total price based on cart items and return it as a string
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.productPrice, 0);
    return `$${total.toFixed(2)}`;
  }

  promoCode: string = ''; // Bind this to the ngModel in the template

  onSubmitPromoCode() {

    if (this.myPromoCode.invalid) {
      // Form is valid, perform signup logic
      console.log("error validation");
      this.toastr.error('Promo Code Required!');
      return
    } else{
      this.toastr.error('Invalid Promo code');
    }

  
    
  }


}
