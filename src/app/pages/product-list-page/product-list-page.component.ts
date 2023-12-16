import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCartItems } from '../../store/selectors/cart.selectors';
import { addToCart } from '../../store/actions/cart.actions';
import { Product } from '../../types/product-types';
import { CartItem } from 'src/app/store/models/cart.models';
import { ProductListService } from '../../services/product-list/product-list.service';
import { CartModalService } from '../../services/cart-modal/cart-modal.service';
import { ActivatedRoute } from '@angular/router';
import { ViewItemModalService } from 'src/app/services/view-item-modal/view-item-modal.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit{
  //for animation
  isAddedToCart = false;
  isProductLoading: boolean = true; 
  products: any = [];
  baseUrl:string = environment.adminServerUrl + "/";
  categoryId: number = 0;

  categoryName = "";


  constructor(private store: Store, private route: ActivatedRoute, private productListService : ProductListService, private cartModalService: CartModalService,  private viewItemModalService: ViewItemModalService,) {
    // this.products = this.productListService.getProducts();
    this.route.params.subscribe(params => {
      this.categoryName =  params['categoryName'];
      this.categoryId =  params['id'];

      this.productListService
      .getProductsByCategoryApi(this.categoryId)
      .subscribe((data) => {
        this.products = data; // Assuming the API response is an array of products
      },
      (error) => {
        console.error("Error fetching products", error);
      },
      () => {
        this.isProductLoading = false; 
      });
    });
    
  }
  // products$ = this.store.pipe(select(selectCartItems));
  products$ = this.store.select(selectCartItems); // Use select instead of pipe(select) for the observable

  addToCartHandler(product: Product){

    this.isAddedToCart = true;
    // Reset the animation state after a short delay (you can adjust the delay as needed)
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 500);

    console.log(product);

    const cartItem: CartItem = { 
      productId: product.id,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: 1,
      cartImg: "https://via.placeholder.com/70x70",
      currency: product.currency,
    };
    this.store.dispatch(addToCart(cartItem));

    // Log the value of products$
    // this.products$.subscribe((cartItems) => {
    //   console.log('Cart Items:', cartItems);
    // });

     // Trigger the animation in CartModalComponent
     this.cartModalService.triggerCartItemAddedAnimation();
  }

  quickShop(product: any){
    // alert("Open Modal");
    this.viewItemModalService.setProduct(product);
    this.viewItemModalService.openModal();
  }

  ngOnInit(){
   

   
  }


}

