import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  date = new Date();

  form = new FormGroup({
    categoryNameEn: new FormControl('', {
      validators: [Validators.required],
    }),
    categoryNameSlug: new FormControl(''),
    categoryAr: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    console.log(this.form.value);

    const categoryNameEn = this.form.value.categoryNameEn;
    const categoryNameSlug = this.form.value.categoryNameSlug;
    const categoryAr = this.form.value.categoryAr;

    const category = {
      categoryNameEn,
      categoryNameSlug,
      categoryAr,
    };
    window.localStorage.setItem('category-form', JSON.stringify(category));
  }
}
