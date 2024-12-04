import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  isLoading = false;
  apiError: string = '';

  //? forgetForm
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  //* forgetLogic
  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  get form() {
    return this.forgetForm.controls;
  }

  get emailIsInvalid() {
    return (
      this.forgetForm.controls['email'].touched &&
      this.forgetForm.controls['email'].dirty &&
      this.forgetForm.controls['email'].invalid
    );
  }

  handelForget() {
    this.forgetForm.markAllAsTouched();
    this.isLoading = true;
    if (this.forgetForm.valid) {
      localStorage.setItem('email', this.forgetForm.value.email);
      this._authService.forget(this.forgetForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.statusMsg == 'success') {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Forget it again successfully',
            });
            this._router.navigate(['/otp']);
          } else {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.apiError = error.error.message;
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.apiError,
          });
        },
      });
    }
  }
}
