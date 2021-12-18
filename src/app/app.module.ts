import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HeaderModule} from "./_Components/header/header.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './_Components/homepage/homepage.component';
import {AllProductsModule} from "./_Components/all-products/all-products.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import { FavouritesComponent } from './_Components/favourites/favourites.component';
import { AddToCartComponent } from './_Components/add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './_Components/checkout/checkout.component';
import { AdminComponent } from './_Components/admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddProductComponent } from './_Components/add-product/add-product.component';
import { SearchComponent } from './_Components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FavouritesComponent,
    AddToCartComponent,
    CheckoutComponent,
    AdminComponent,
    AddProductComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HeaderModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AllProductsModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
