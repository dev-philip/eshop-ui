import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCartItems } from '../../store/selectors/cart.selectors';
import { addToCart } from '../../store/actions/cart.actions';
import { Product } from '../../types/product-types';
import { CartItem } from 'src/app/store/models/cart.models';
import { ProductListService } from '../../services/product-list/product-list.service';
import { CartModalService } from '../../services/cart-modal/cart-modal.service';
import { SearchService } from 'src/app/services/search/search.service';
import { ViewItemModalService } from 'src/app/services/view-item-modal/view-item-modal.service';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit{


  isAddedToCart = false;   // For animation - Initialize the property to false

  searchInput: string = ""; //search input
  isProductLoading: boolean = true; 
  products: Product[] = [];
  originalProducts: Product[] = []; //hold the original Product
  productsSubscription: Subscription;
  baseUrl:string = environment.adminServerUrl + "/";

  constructor(
    private store: Store, 
    private productListService : ProductListService, 
    private cartModalService: CartModalService, 
    private searchService: SearchService,
    private viewItemModalService: ViewItemModalService,
    ) {
    // this.products = this.productListService.getProducts();
    
    this.productsSubscription = this.productListService
    .getProductsApi()
    .subscribe((data) => {
      this.products = data; 
      this.originalProducts =  [...this.products];
      console.log("data we get ola", data);
    },
    (error) => {
      console.error("Error fetching products", error);
    },() => {
      this.isProductLoading = false; 
    });
    // this.originalProducts =  [...this.products]; // Copy the original products
  }
  // products$ = this.store.pipe(select(selectCartItems));
  products$ = this.store.select(selectCartItems); // Use select instead of pipe(select) for the observable

  quickShop(product: any){
    // alert("Open Modal");
    this.viewItemModalService.setProduct(product);
    this.viewItemModalService.openModal();
  }

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
      cartImg: product.addToCartImg,
      currency: product.currency,
    };

    this.store.dispatch(addToCart(cartItem));

  

     // Trigger the animation in CartModalComponent
     this.cartModalService.triggerCartItemAddedAnimation();
  }

  ngOnInit() {
    // this.searchControl.valueChanges
    //   .pipe(debounceTime(300), distinctUntilChanged())
    //   .subscribe((searchTerm) => {
    //     this.searchService.setSearchInput(searchTerm);
    //   });

    this.searchService.getSearchInput().subscribe((value) => {
      this.searchInput = value;
      this.filterProducts();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.productsSubscription.unsubscribe();
  }

  // Filter products based on search input
  filterProducts() {
    if (this.searchInput) {
      const searchTerm = this.searchInput.toLowerCase();
      this.products = this.originalProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
    } else {
      // If search input is empty, show all original products
      this.products = [...this.originalProducts];
    }
  }
}
