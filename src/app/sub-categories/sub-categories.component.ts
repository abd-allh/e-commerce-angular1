import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css',
})
export class SubCategoriesComponent implements OnInit {
  isLoading = false;
  subcategories: any; //getSubCategories
  subcategory: any; //getSpecificSubCategory

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    //* Get All Products
    this._authService.getSubCategories().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.subcategories = res.data;
        console.log('subcategories  ', this.subcategories);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.error.message, 'Err: ', err);
      },
    });
  }
}
