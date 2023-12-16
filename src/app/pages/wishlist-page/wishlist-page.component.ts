import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {


  
  addToCartHandler(productId: string){
    alert("I will add to cart" + productId);
  }


  deleteItemInCartHandler(productId: string){
    alert("Delete - " + productId);
  }

}
