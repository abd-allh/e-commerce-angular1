import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.css',
})
export class FinishComponent implements OnInit {
  category: {
    categoryNameEn: string;
    categoryNameSlug: string;
    categoryAr: string;
  } = {
    categoryNameEn: '',
    categoryNameSlug: '',
    categoryAr: '',
  };

  subCategory: {
    subCategoryNameEn: string;
    subCategoryNameSlug: string;
    subCategoryAr: string;
  } = {
    subCategoryNameEn: '',
    subCategoryNameSlug: '',
    subCategoryAr: '',
  };

  ngOnInit() {
    const savedForm1 = window.localStorage.getItem('category-form');
    if (savedForm1) {
      this.category = JSON.parse(savedForm1);
    }
    const savedForm2 = window.localStorage.getItem('subCategory-form');
    if (savedForm2) {
      this.subCategory = JSON.parse(savedForm2);
    }
  }
}
