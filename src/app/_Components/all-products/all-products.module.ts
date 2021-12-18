import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})
export class AllProductsModule { }
