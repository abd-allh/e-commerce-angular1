import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  if (localStorage.getItem('userToken')) {
    _router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
