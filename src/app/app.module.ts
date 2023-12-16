import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

/* state management starts here */
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/* State Managenent ends here*/

/*environment Log configuration */
import { environment } from '../environments/environment';

/*Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/header/search/search.component'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './pages/account/account.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CartDetailsPageComponent } from './pages/cart-details-page/cart-details-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/auth-pages/signup-page/signup-page.component';
import { ForgetPasswordPageComponent } from './pages/auth-pages/forget-password-page/forget-password-page.component';
import { ResetPasswordPageComponent } from './pages/auth-pages/reset-password-page/reset-password-page.component';
import { ViewItemModalComponent } from './components/view-item-modal/view-item-modal.component';
import { LoginModalComponent } from './components/auth-modal/login-modal/login-modal.component';
import { SignupModalComponent } from './components/auth-modal/signup-modal/signup-modal.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { TestPage2Component } from './pages/test-page2/test-page2.component'; // Import ReactiveFormsModule



import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxTypedJsModule } from 'ngx-typed-js';

// // Configure the socket connection
const config: SocketIoConfig = { url: `${environment.adminServerUrl}`, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    CheckoutPageComponent,
    HomePageComponent,
    ProductListPageComponent,
    CartModalComponent,
    ProductsPageComponent,
    TestPageComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AccountComponent,
    ContactUsComponent,
    CartDetailsPageComponent,
    ProductDetailsPageComponent,
    ProductDetailsModalComponent,
    LoginPageComponent,
    SignupPageComponent,
    ForgetPasswordPageComponent,
    ResetPasswordPageComponent,
    ViewItemModalComponent,
    LoginModalComponent,
    SignupModalComponent,
    WishlistPageComponent,
    CatalogPageComponent,
    TestPage2Component,
  ],
  imports: [
    NgxTypedJsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      cart: cartReducer, // Map your reducers here
    }),
    StoreDevtoolsModule.instrument({
      // Optional options for configuring the DevTools extension
      maxAge: 25, // Specify a maximum number of actions to retain
      logOnly: environment.activateNgrxForProduction, // Set to true in production mode to disable the DevTools
    }),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
