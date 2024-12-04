import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import type { Brand } from '../home/home.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  isLoading = false;
  searchTerm: string = '';

  brands: Brand[] = []; //getBrands
  brand: any; //getSpecificBrand

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    //* Get All Products
    this._authService.getBrands().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.brands = res.data;
        console.log('brands ', this.brands);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.error.message, 'Err: ', err);
      },
    });
  }
}
