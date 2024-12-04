import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@test.com') {
    return of(null);
  }

  return of({ notUnique: true });
}

@Component({
  selector: 'app-register',
  template: '<h1>Register</h1>',
  styleUrl: './register.component.css',
})
export class Register2Component implements OnInit {
  isLoading: boolean = false;
  registerForm2: FormGroup = new FormGroup({});
  // registerForm, first validator is from Max
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
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
  // registerForm

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm2 = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailIsUnique],
      }),
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
  }
  get form() {
    return this.registerForm2.controls;
  }
  get emailIsInvalid() {
    return (
      this.registerForm.controls['email'].touched &&
      this.registerForm.controls['email'].dirty &&
      this.registerForm.controls['email'].invalid
    );
  }
  handelRegister() {
    debugger;
    this.isLoading = true;
    if (this.registerForm.valid) {
      debugger;
      this._authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(error);
        },
      });
    }
  }
}
