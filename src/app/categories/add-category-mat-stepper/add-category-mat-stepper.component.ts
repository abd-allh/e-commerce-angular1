import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AddCategoryService } from './add-category.service';

import type { formObject, SubCategory } from './add-cat.model';

@Component({
  selector: 'app-add-category-mat-stepper',
  templateUrl: './add-category-mat-stepper.component.html',
  styleUrl: './add-category-mat-stepper.component.css',
  providers: [
    { provide: MatStepper, useExisting: AddCategoryMatStepperComponent },
  ],
})
export class AddCategoryMatStepperComponent implements OnInit {
  _form = inject(AddCategoryService);
  data!: formObject;
  prevForm!: any; //* Store the previous form data from the BehaviorSubject for editing
  storedFormData!: formObject; //* Store the previous form data from the Local Storage for editing

  isLinear = true;
  isEditMode = false;
  isHidden = true;

  updatedData: any;
  editingRowId!: string;
  editingRow!: SubCategory;

  form = new FormGroup({
    form1: new FormGroup({
      categoryNameEn: new FormControl('', {
        validators: [Validators.required],
      }),
      categoryNameAr: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    form2: new FormGroup({
      id: new FormControl(this.generateUniqueId()),
      subCategoryNameEn: new FormControl('', {
        validators: [Validators.required],
      }),
      subCategoryNameAr: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
  });

  ngOnInit(): void {
    this.storedFormData = JSON.parse(
      window.localStorage.getItem('formData') ?? '{}'
    );
    console.log('Stored form data: ', this.storedFormData);

    if (this.storedFormData) {
      // this.isLinear = false;
      this.catForm1.patchValue(this.storedFormData.form1);
      // this._form.setCategoryForm(this.storedFormData);
    }

    //   if (this._form.categoryForm) {
    //     this._form.categoryForm.subscribe({
    //       next: (res) => {
    //         this.prevForm = res;
    //       },
    //       error: (err) => {
    //         console.log('eeeeee', err);
    //       },
    //     });
    //   }
  }

  onEditRow(row: any) {
    console.log('Editing row: onEditRow: ', row);

    this.isEditMode = true;
    this.editingRowId = row.id;

    // this.catForm1.disable();
    //* Fill form2 with the row's data for editing
    this.subCatForm2.setValue({
      id: row.id,
      subCategoryNameEn: row.subCategoryNameEn,
      subCategoryNameAr: row.subCategoryNameAr,
    });
  }

  onSave() {
    window.localStorage.setItem('formData', JSON.stringify(this.updatedData));
    this.updatedData = {
      form1: this.form.get('form1')?.value,
      form2: this.form.get('form2')?.value,
    };
    this._form.setCategoryForm(this.updatedData);
    this.isHidden = true;
    this.isEditMode = false;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.isHidden = false;
    if (this.form.invalid) {
      alert('Please fill in all fields');
      return;
    }
    if (!this.isEditMode) {
      this.form.get('form2.id')?.setValue(this.generateUniqueId());
    }

    const updatedSubCategory = {
      id:
        this.isEditMode && this.editingRowId
          ? this.editingRowId
          : this.generateUniqueId(), // Generate ID for new entries
      ...this.subCatForm2.value,
    };

    if (this.prevForm) {
      const prevData = JSON.parse(this.prevForm);

      if (this.isEditMode) {
        // *Check if an edit is ongoing (using a flag or checking if a row matches)

        const indexToUpdate = prevData.form2.findIndex(
          (row: any) =>
            row.id.toString().trim() === updatedSubCategory.id.toString().trim()
        );

        if (indexToUpdate >= 0) {
          //* Replace the original row with the updated data
          prevData.form2[indexToUpdate] = updatedSubCategory;
        }
        this.updatedData = {
          form1: prevData.form1,
          form2: prevData.form2,
        };
      } else {
        // Add a new row
        prevData.form2.push(updatedSubCategory);
      }
      this.updatedData = {
        form1: prevData.form1,
        form2: prevData.form2,
      };
    } else {
      //* Initial data if no previous form exists
      this.updatedData = {
        form1: this.catForm1.value,
        form2: [updatedSubCategory],
      };
    }
    //* Emit updated data to the BehaviorSubject
    this._form.setCategoryForm(this.updatedData);
    this.resetForm();

    console.log('Updated form data: ', this.updatedData);
    console.log('Updated _form data: ', this._form.categoryForm.value);
  }

  resetForm() {
    this.subCatForm2.reset(); // Clear form2
    // this.catForm1.enable(); // Re-enable form1
    this.isEditMode = false; // Reset edit mode
    this.editingRowId = ''; // Clear editing row ID
  }

  get catForm1() {
    return this.form.get('form1') as FormGroup;
  }
  get subCatForm2() {
    return this.form.get('form2') as FormGroup;
  }

  generateUniqueId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    );
  }
}
