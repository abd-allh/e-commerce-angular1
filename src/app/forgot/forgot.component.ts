import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  template: '',
  styles: '',
})
export class ForgotComponent {
  isLoading = false;
  apiError: string = '';

  //? parentForm
  form = new FormGroup({});

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  handleSubmit() {
    this.form.markAllAsTouched();

    this.isLoading = true;
    console.log(this.form.value);
    this.isLoading = false;
  }
  // handelForget() {
  //   this.forgetForm.markAllAsTouched();
  //   this.isLoading = true;
  //   if (this.forgetForm.valid) {
  //     this._authService.forget(this.forgetForm.value).subscribe({
  //       next: (response) => {
  //         console.log('if valid: ', response);

  //         this.isLoading = false;
  //         if (response.statusMsg == 'success') {
  //           console.log('if success: ', response);

  //           this._messageService.add({
  //             severity: 'success',
  //             summary: 'Success',
  //             detail: 'Forget it again Successfully',
  //           });
  //           // localStorage.setItem('userToken', response.token);
  //           // this._authService.setUserToken();
  //           this._router.navigate(['/otp']);
  //         } else {
  //           console.log('else: ', response);

  //           this._messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: response.message,
  //           });
  //         }
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         this.isLoading = false;
  //         this.apiError = error.error.message;
  //         this._messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: this.apiError,
  //         });
  //       },
  //     });
  //   }
  // }
}
