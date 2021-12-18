import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddItemToCartService {
  private cartItems: number[] = [];

  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]")
  }

  addToCart(index: number) {
    this.cartItems.push(index)
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
  }

  isItemInCart(index: number): boolean {
    return this.cartItems.indexOf(index) > -1;
  }

  removeItemFromCart(index: number) {
    const indexToDelete = this.cartItems.indexOf(index);
    this.cartItems.splice(indexToDelete, 1)
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
  }

  getCartList(): number[] {
    return this.cartItems;
  }

}

