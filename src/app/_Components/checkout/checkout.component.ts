import { Component, OnInit } from '@angular/core';
import {AddItemToCartService} from "../../add-item-to-cart.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
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

  confirmPayment() {
    alert('Order completed successfully.')
  }
}
