import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: [
    '../register/register.component.css',
    './check-out.component.css',
  ],
})
export class CheckOutComponent {
  isLoading: boolean = false;
  apiError: string = '';

  cartId: string = '';

  // checkOutForm
  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[01256][0-9]{8}$/),
    ]),
    city: new FormControl('', [Validators.required]),
  });

  // checkOutLogic
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  // getters
  get form() {
    return this.checkOutForm.controls;
  }

  handleCODCheckout() {
    this.checkOutForm.markAllAsTouched();
    this.isLoading = true;
    this._activatedRoute.params.subscribe((params) => {
      this.cartId = params['id'];
      if (this.cartId && this.checkOutForm.valid) {
        this._authService
          .checkOut(this.cartId, this.checkOutForm.value)
          .subscribe({
            next: (res) => {
              this.isLoading = false;
              console.log('res ', res);
              if (res.status == 'success') {
                this._messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'User CheckedOut successfully',
                });
                this._authService.totalNumOfCartItems.next(0);
                this._router.navigate(['/home']);
              } else {
                this._messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.message,
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
    });
  }
  handleVisaCheckout() {
    this.checkOutForm.markAllAsTouched();
    this.isLoading = true;
    this._activatedRoute.params.subscribe((params) => {
      this.cartId = params['id'];
      if (this.cartId && this.checkOutForm.valid) {
        this._authService
          .checkOutSession(this.cartId, this.checkOutForm.value)
          .subscribe({
            next: (res) => {
              this.isLoading = false;
              console.log('res ', res);
              if (res.status == 'success') {
                this._messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'User Checking Out...',
                });
                this._authService.totalNumOfCartItems.next(0);
                console.log('res.session.url ', res.session.url);
                // this._router.navigate(res.session.url);
                // this._router.navigateByUrl(res.session.url);
                window.open(res.session.url, '_blank');
              } else {
                this._messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.message,
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
    });
  }
}
