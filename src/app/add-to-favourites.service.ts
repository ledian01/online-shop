import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToFavouritesService {

  private readonly wishList: number[] = [];

  constructor() {
    this.wishList = JSON.parse(localStorage.getItem("wishList") ?? "[]")
  }

  markItemAsFavourite(index: number) {
    this.wishList.push(index)
    localStorage.setItem("wishList", JSON.stringify(this.wishList))
  }

  isItemInFavourites(index: number): boolean {
    return this.wishList.indexOf(index) > -1;
  }

  unmarkItemAsFavourite(index: number) {
    const indexToDelete = this.wishList.indexOf(index);
    this.wishList.splice(indexToDelete, 1)
    localStorage.setItem("wishList", JSON.stringify(this.wishList))
  }

  getWishList(): number[] {
    return this.wishList;
  }

}
