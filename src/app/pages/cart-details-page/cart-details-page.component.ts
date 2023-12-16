import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-details-page',
  templateUrl: './cart-details-page.component.html',
  styleUrls: ['./cart-details-page.component.css']
})
export class CartDetailsPageComponent {

  incrementItemInCartHandler(productId: string){
    alert("I will increment- " + productId);
  }

  decrementItemInCartHandler(productId: string){
    alert("I will decrement - " + productId);
  }

  deleteItemInCartHandler(productId: string){
    alert("Delete - " + productId);
  }

}
