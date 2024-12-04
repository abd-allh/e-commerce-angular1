import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../home/home.model';
import type { ProductDetails } from './product-details.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  isLoading = false;
  productId: string = '';

  productDetails!: ProductDetails;

  productImages!: string[];
  categoryName!: string;
  categoryProducts: Product[] = [];
  products: Product[] = [];

  totalProducts: number = 0; // Total number of products
  currentPage: number = 1; // Current page number
  pageSize: number = 10;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    navText: [
      '<i class="fa-solid fa-circle"></i>',
      '<i class="fa-solid fa-circle"></i>',
    ],
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        //* Get A Specific Product
        this._authService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.productDetails = res.data;
            this.categoryName = res.data.category.name;
            this.productImages = res.data.images;
          },
        });
        //* Get All Products
        this._authService
          .getProducts(this.currentPage, this.pageSize)
          .subscribe({
            next: (res) => {
              this.isLoading = false;
              this.products = res.data;
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
