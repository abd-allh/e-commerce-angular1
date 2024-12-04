import { Component, OnInit } from '@angular/core';
import { Product } from '../home/home.model';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../cart/services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  isLoading = false;
  apiError: string = '';
  searchTerm: string = '';
  products: Product[] = []; //getProducts

  totalProducts: number = 0; // Total number of products
  currentPage: number = 1; // Current page number
  pageSize: number = 14;

  rating: number = 3.5; // Example rating
  starWidth: number = 0;

  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    //* Get All Products
    this.loadProducts();
    this.setStarWidth(this.rating);
  }
  loadProducts(): void {
    this.isLoading = true;
    this._authService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.products = res.data;
        this.totalProducts = res.results;
        console.log(this.totalProducts);
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.error.message, 'Err: ', err);
      },
    });
  }
  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPage = page;
    this.loadProducts();
    this.isLoading = false;
  }
  totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  setStarWidth(rating: number) {
    this.starWidth = (rating / 5) * 100; // Convert rating to percentage
  }

  addToCart(id: string): void {
    this.isLoading = true;
    this._cartService.addToCart(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._authService.totalNumOfCartItems.next(res.numOfCartItems);
        console.log('cartItems ', res.numOfCartItems);
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added to cart successfully',
          life: 1000,
        });
      },
    });
  }
}
