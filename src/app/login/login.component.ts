import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css', './login.component.css'],
})
export class LoginComponent {
  isLoading: boolean = false;
  apiError: string = '';

  //? loginForm
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  //* loginLogic
  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  get form() {
    return this.loginForm.controls;
  }
  get emailIsInvalid() {
    return (
      this.loginForm.controls['email'].touched &&
      this.loginForm.controls['email'].dirty &&
      this.loginForm.controls['email'].invalid
    );
  }

  handelLogin() {
    this.loginForm.markAllAsTouched();
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._authService.logIn(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message == 'success') {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User logged in successfully',
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
