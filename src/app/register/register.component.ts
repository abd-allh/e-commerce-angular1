import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading: boolean = false;
  apiError: string = '';

  // registerForm
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[01256][0-9]{8}$/),
    ]),
  });

  // registerLogic
  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  // getters
  get form() {
    return this.registerForm.controls;
  }
  get emailIsInvalid() {
    return (
      this.registerForm.controls['email'].touched &&
      this.registerForm.controls['email'].dirty &&
      this.registerForm.controls['email'].invalid
    );
  }

  handelRegister() {
    this.registerForm.markAllAsTouched();
    this.isLoading = true;
    if (this.registerForm.valid) {
      this._authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message == 'success') {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User registered successfully',
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
