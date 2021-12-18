import {Component, OnInit} from '@angular/core';
import {AddToFavouritesService} from "../../add-to-favourites.service";

import {faHeartbeat} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
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
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favoritesList: any[] = [];
  productsArray: any[] = [];
  faHeart = faHeart;
  faHeartBeat = faHeartbeat;
  faShoppingCart = faShoppingCart;


  constructor(private favouriteItems: AddToFavouritesService,
              public auth: AngularFireAuth,
              private firestore: AngularFirestore,

  ) {
  }

  ngOnInit(): void {
    this.favoritesList = this.favouriteItems.getWishList();
    debugger

    this.firestore.collection('all-products')
      .get().subscribe(snaps => {
        this.productsArray = [];
        snaps.forEach(snap => {
            if (this.favoritesList.indexOf(snap.id) !== -1) {
              this.productsArray.push({...snap.data() as Products, id: snap.id});
            }
          }
        )
      }
    )
  }

  unmarkItemAsFavourite(id: number) {
    const prodIndex = this.productsArray.findIndex(x => x.id == id);
    this.productsArray.splice(prodIndex,1);
    this.favouriteItems.unmarkItemAsFavourite(id);
  }

}

