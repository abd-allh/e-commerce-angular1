import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sub-categories',
  templateUrl: './add-sub-categories.component.html',
  styleUrl: './add-sub-categories.component.css',
})
export class AddSubCategoriesComponent {
  date = new Date();

  form = new FormGroup({
    subCategoryNameEn: new FormControl('', {
      validators: [Validators.required],
    }),
    subCategoryNameSlug: new FormControl(''),
    subCategoryAr: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    console.log(this.form.value);

    // const subCategoryNameEn = this.form.value.subCategoryNameEn;
    // const subCategoryNameSlug = this.form.value.subCategoryNameSlug;
    // const subCategoryAr = this.form.value.subCategoryAr;

    // const subCategory = {
    //   subCategoryNameEn,
    //   subCategoryNameSlug,
    //   subCategoryAr,
    // };
    // this.subCategories.push(subCategory);
    // console.log(this.subCategories);
    // this.form.reset();
    window.localStorage.setItem(
      'subCategory-form',
      JSON.stringify(this.form.value)
    );
  }
}
