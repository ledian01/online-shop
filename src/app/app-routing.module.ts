import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./_Components/homepage/homepage.component";
import {ProductsComponent} from "./_Components/all-products/products/products.component";
import {LoginComponent} from "./authentication/login/login.component";
import {SignupComponent} from "./authentication/signup/signup.component";
import {FavouritesComponent} from "./_Components/favourites/favourites.component";
import {AddToCartComponent} from "./_Components/add-to-cart/add-to-cart.component";
import {CheckoutComponent} from "./_Components/checkout/checkout.component";
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import {AdminComponent} from "./_Components/admin/admin.component";
import {AddProductComponent} from "./_Components/add-product/add-product.component";
import {AdminGuard} from "./admin.guard";
import {SearchComponent} from "./_Components/search/search.component";


const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'products/:category', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'favourites', component: FavouritesComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'cart', component: AddToCartComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard]},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
