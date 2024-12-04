import { Component, OnInit } from '@angular/core';
import { Product } from '../home/home.model';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
})
export class CategoryProductsComponent implements OnInit {
  isLoading = false;
  categoryName: string = '';
  products: Product[] = [];
  categoryProducts: Product[] = [];
  // categoryProducts: any; //getProducts

  currentPage: number = 1; // Current page number
  pageSize: number = 10;

  constructor(
    private _activatedRoute: ActivatedRoute,

    private _authService: AuthService,
    // private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._activatedRoute.params.subscribe((params) => {
      this.categoryName = params['name'];
      if (this.categoryName) {
        //* Get All Products
        this._authService
          .getProducts(this.currentPage, this.pageSize)
          .subscribe({
            next: (res) => {
              this.isLoading = false;
              this.products = res.data;
              console.log('here');
              this.getCategoryProducts(this.categoryName);
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              console.log(err.error.message, 'Err: ', err);
            },
          });
      }
    });
  }

  //* Filter categoryProducts
  getCategoryProducts(categoryName: string): void {
    this.categoryProducts = this.products.filter((product) => {
      return product.category.name === categoryName;
    });
    console.log(this.categoryProducts);
  }
}
