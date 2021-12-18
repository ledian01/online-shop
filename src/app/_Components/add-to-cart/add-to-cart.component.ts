import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AddItemToCartService} from "../../add-item-to-cart.service";

class Products {
  id: any
  name: any
  category: string | undefined
  price: string | undefined
  size: string | undefined
  description: string | undefined
  image: any;
}

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  cartList: any[] = [];
  productsArray: any[] = [];

  constructor(private cartItems: AddItemToCartService,
              public auth: AngularFireAuth,
              private firestore: AngularFirestore
  ) {
    this.cartList= cartItems.getCartList();
  }

  ngOnInit(): void {
    this.firestore.collection('all-products')
      .get().subscribe(snaps => {
        this.productsArray = [];
        snaps.forEach(snap => {
            if (this.cartList.indexOf(snap.id) !== -1) {
              // @ts-ignore
              this.productsArray.push({...snap.data(), id: snap.id} as Products)
            }
          }
        )
      }
    )
  }
  removeItemFromCart(index: number) {
    const prodIndex = this.productsArray.findIndex(x => x.id == index);
    this.productsArray.splice(prodIndex,1);
    this.cartItems.removeItemFromCart(index);
  }
}
