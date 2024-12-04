import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import type { Product } from '../../home/home.model';
import { CartService } from '../services/cart.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  isLoading: boolean = false;
  cart: any = [];
  cartId: string = '';

  // totalQuantity: number = 0;
  // totalDiscount: number = 0;
  // totalPriceAfterDiscount: number = 0;

  constructor(
    private _cartService: CartService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.isLoading = false;

        console.log('getCart ', res);
        this.cart = res.data;
        this.cartId = res.cartId;
        console.log('cartId ', this.cartId);
        // this.totalQuantity = res.data.totalCartQuantity;
        // this.totalDiscount = res.data.discount;
        // this.totalPriceAfterDiscount = res.data.totalPriceAfterDiscount;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;

        console.log(err.error.message, 'Err: ', err);
      },
    });
  }

  updateCount(id: string, count: number): void {
    if (count) {
      this.isLoading = true;
      this._cartService.updateCart(id, count).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.cart = res.data;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(err.error.message, 'Err: ', err);
        },
      });
    }
  }
  removeProductFromCart(id: string): void {
    this.isLoading = true;
    this._cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        this._authService.totalNumOfCartItems.next(res.numOfCartItems);
        this.isLoading = false;
        console.log(res);
        this.cart = res.data;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.error.message, 'Err: ', err);
      },
    });
  }
  clearCart(): void {
    const wantsToClear = window.confirm(
      'Are you sure you want to clear the cart?'
    );
    if (wantsToClear) {
      this.isLoading = true;
      this._cartService.clearCart().subscribe({
        next: (res) => {
          this._authService.totalNumOfCartItems.next(res.numOfCartItems);
          this.isLoading = false;
          console.log(res);
          this.cart = res.data;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(err.error.message, 'Err: ', err);
        },
      });
    }
  }
}
