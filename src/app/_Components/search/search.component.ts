import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SearchService} from "../../search.service";
import {AddToFavouritesService} from "../../add-to-favourites.service";
import {AddItemToCartService} from "../../add-item-to-cart.service";
import {faHeartbeat} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  productsArray: any[] = [];
  searchArray: any[] = [];
  faSearch = faSearch;
  faHeart = faHeart;
  faHeartBeat = faHeartbeat;
  faShoppingCart = faShoppingCart;

  constructor(private firestore: AngularFirestore,
              private activatedRoute: ActivatedRoute,
              public auth: AngularFireAuth,
              public router: Router,
              private AddToFavouritesService: AddToFavouritesService,
              private AddItemToCartService : AddItemToCartService,
              private search: SearchService) {
  }

  ngOnInit(): void {

    this.firestore.collection('all-products', ref => ref.where("name", "==", this.search.searchText))
      .get().subscribe(snaps => {
        this.productsArray = [];
        snaps.forEach(snap => {
            // @ts-ignore
            this.productsArray.push({ ...snap.data(), id: snap.id } as Products)
          }
        )
      }
    )
  }


  onSearchClick(url: string | undefined): void {
    if (url) {
      window.open(url);
    }
  }

  markItemAsFavourite(index: number) {
    this.AddToFavouritesService.markItemAsFavourite(index);
  }

  isItemInFavourites(index: number): boolean {
    return this.AddToFavouritesService.isItemInFavourites(index);
  }

  unmarkItemAsFavourite(index: number) {
    this.AddToFavouritesService.unmarkItemAsFavourite(index)
  }

  addToCart(index: number) {
    this.AddItemToCartService.addToCart(index);
  }

  isItemInCart(index: number): boolean {
    return this.AddItemToCartService.isItemInCart(index);
  }

  removeItemFromCart(index: number) {
    this.AddItemToCartService.removeItemFromCart(index)
  }

}
