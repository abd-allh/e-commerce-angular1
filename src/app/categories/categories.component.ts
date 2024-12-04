import { Component } from '@angular/core';
import { Category } from '../home/home.model';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  isLoading = false;
  searchTerm: string = '';
  categories: Category[] = [];

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    //* Get All Products
    this._authService.getCategories().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.categories = res.data;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.error.message, 'Err: ', err);
      },
    });
  }
}
