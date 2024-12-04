import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;
  apiError: string = '';
  email: string = '';
  resetForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('email')) {
      this._router.navigate(['/login']);
    } else {
      this.email = localStorage.getItem('email')!;
      //? ResetForm
      this.resetForm = new FormGroup({
        email: new FormControl({ value: this.email, disabled: true }),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\w{6,}$/),
        ]),
      });
    }
  }

  //* ResetLogic
  get form() {
    return this.resetForm.controls;
  }

  handelReset() {
    this.resetForm.markAllAsTouched();
    this.isLoading = true;
    if (this.resetForm.valid) {
      const formData = this.resetForm.getRawValue();
      this._authService.reset(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.token) {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password has been reset successfully',
            });
            localStorage.setItem('userToken', response.token);
            this._authService.setUserToken();
            this._router.navigate(['/home']);
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
