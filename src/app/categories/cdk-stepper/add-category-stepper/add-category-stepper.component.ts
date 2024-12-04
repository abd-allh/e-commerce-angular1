import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-category-stepper',
  templateUrl: './add-category-stepper.component.html',
  styleUrl: './add-category-stepper.component.css',
  providers: [
    { provide: CdkStepper, useExisting: AddCategoryStepperComponent },
  ],
})
export class AddCategoryStepperComponent extends CdkStepper {
  @Input() isLinear = false;
  @Input() linearModeSelected = true;

  selectStep(index: number): void {
    this.selectedIndex = index;
  }
}
