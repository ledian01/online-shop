import { Component, OnInit } from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AddToFavouritesService} from "../../../add-to-favourites.service";
import {AddItemToCartService} from "../../../add-item-to-cart.service";
import {AuthService} from "../../../auth.service";
import { SearchService } from "../../../search.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

faSearch=faSearch;
faHeart=faHeart;
faShoppingCart=faShoppingCart;
searchText: string | undefined = '';


  constructor(public auth: AngularFireAuth ,
              private AddToFavouritesService : AddToFavouritesService,
              private AddItemToCartService : AddItemToCartService,
              public authService: AuthService,
              private search: SearchService) { }

  ngOnInit(): void {
  }

  searchBar() {
    this.search.searchText = this.searchText;
  }

  getWishListLength(): number {
    return this.AddToFavouritesService.getWishList().length;
  }

  getCartListLength(): number {
    return this.AddItemToCartService.getCartList().length;
  }
}
