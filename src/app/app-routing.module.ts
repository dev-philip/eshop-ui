import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TestPage2Component } from './pages/test-page2/test-page2.component';
import { AccountComponent } from './pages/account/account.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CartDetailsPageComponent } from './pages/cart-details-page/cart-details-page.component';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';

const routes: Routes = [
  { path: 'test', component: TestPageComponent }, // For Test
  { path: 'test2', component: TestPage2Component }, // For Test2
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart-items', component: CartDetailsPageComponent },
  { path: 'category/:categoryName/:id', component: ProductListPageComponent }, //ProductListComponent
  { path: 'category', component: CheckoutPageComponent }, //ProductListComponent
  { path: 'products', component: ProductsPageComponent }, //ProductListComponent
  { path: 'home', component: CatalogPageComponent },
  { path: '', component: CatalogPageComponent }, // Default route
  //{ path: '', redirectTo: '', pathMatch: 'full'}, // Default route
  //{ path: '**', redirectTo: '', pathMatch: 'full'}, // PageNotFound - if the url doesn't match anything

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
