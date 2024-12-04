import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import type { Product, Category } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = false;
  searchTerm: string = '';

  categories: Category[] = []; //*getCategories
  products: Product[] = []; //*getProducts

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
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    },
  };

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;

    //* Get All Categories
    this._authService.getCategories().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.categories = response.data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error.error.message, 'Err: ', error);
      },
    });

    //* Get All Products
    this._authService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('getProducts ', response.data);
        this.products = response.data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error.error.message, 'Err: ', error);
      },
    });
  }
}
