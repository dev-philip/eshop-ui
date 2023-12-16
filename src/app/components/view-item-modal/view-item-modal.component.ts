import { Component, OnInit} from '@angular/core';
import { ViewItemModalService } from 'src/app/services/view-item-modal/view-item-modal.service';
import { addToCart } from 'src/app/store/actions/cart.actions';
import { CartItem } from 'src/app/store/models/cart.models';
import { environment } from 'src/environments/environment';
import { select, Store } from '@ngrx/store';
import { CartModalService } from 'src/app/services/cart-modal/cart-modal.service';

@Component({
  selector: 'app-view-item-modal',
  templateUrl: './view-item-modal.component.html',
  styleUrls: ['./view-item-modal.component.css']
})
export class ViewItemModalComponent implements OnInit{

  product: any | undefined;
  baseUrl:string = environment.adminServerUrl + "/";
  isAddedToCart: boolean | undefined;

  constructor(private viewItemModalService: ViewItemModalService,  private store: Store,   private cartModalService: CartModalService,  ) {}

  closeModal() {
    this.viewItemModalService.closeModal();
  }


  addToCartHandler(){
    this.isAddedToCart = true;
    // Reset the animation state after a short delay (you can adjust the delay as needed)
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 500);
    console.log(this.product);

    const cartItem: CartItem = { 
      productId: this.product.id,
      productName: this.product.productName,
      productPrice: this.product.productPrice,
      quantity: 1,
      cartImg: this.product.addToCartImg,
      currency: this.product.currency,
    };

    this.store.dispatch(addToCart(cartItem));

  

     //Trigger the animation in CartModalComponent
     this.cartModalService.triggerCartItemAddedAnimation();
  }

  getRandomInt(min: number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const finalNumber = randomNum.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return finalNumber;
  }

  ngOnInit() {
    this.viewItemModalService.currentProduct.subscribe(product => {
      this.product = product;
      // Do something with the product ID in your modal
      console.log(this.product);
    });
  }
}
