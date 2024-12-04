import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddCategoryService {
  categoryForm: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  setCategoryForm(data: any) {
    console.log('Updated data in BehaviorSubject:', this.categoryForm.value);

    let form = JSON.stringify(data);
    this.categoryForm.next(form);
  }

  getData() {
    if (window.localStorage.getItem('formData')) {
      return JSON.parse(window.localStorage.getItem('formData') || '{}');
    }
    return this.categoryForm;
  }
}
