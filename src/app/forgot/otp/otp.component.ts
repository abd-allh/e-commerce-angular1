import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styles: [
    `
      .custom-otp-input {
        width: 48px;
        height: 48px;
        font-size: 24px;
        appearance: none;
        text-align: center;
        transition: all 0.2s;
        border-radius: 0;
        border: 1px solid var(--surface-400);
        background: transparent;
        outline-offset: -2px;
        outline-color: transparent;
        border-right: 0 none;
        transition: outline-color 0.3s;
        color: var(--text-color);
      }

      .custom-otp-input:focus {
        outline: 2px solid var(--primary-color);
      }

      .custom-otp-input:first-child,
      .custom-otp-input:nth-child(5) {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      .custom-otp-input:nth-child(3),
      .custom-otp-input:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        border-right-width: 1px;
        border-right-style: solid;
        border-color: var(--surface-400);
      }
    `,
  ],
})
export class OtpComponent {
  value: any;

  isLoading = false;
  apiError: string = '';

  //? otpForm
  otpForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
    ]),
  });

  //* otpLogic
  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  get form() {
    return this.otpForm.controls;
  }

  handelOtp() {
    console.log(this.otpForm.value);
    console.log(this.value);

    this.otpForm.markAllAsTouched();
    // this.otpForm.value = '';
    this.isLoading = true;
    if (this.otpForm.valid) {
      this._authService.otp(this.otpForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status == 'Success') {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Verification code sent successfully',
            });
            this._router.navigate(['/reset']);
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
