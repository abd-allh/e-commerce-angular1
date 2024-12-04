import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

// :CanMatchFn = (route, segments) => {
//   return true:
//   return RedirectCommand(_router.parseUrl('/login'));
// };
export const authGuardGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);

  const userToken = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole');

  if (userToken) {
    const requiredRoles = route.data?.['roles'];
    // If roles are specified in route data, check if userRole is allowed
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      _router.navigate(['/home']); // Redirect unauthorized user
      return false;
    }

    // const requiresAdmin = route.routeConfig?.path === 'categories';
    // if (requiresAdmin && userRole !== 'admin') {
    //   _router.navigate(['/home']); // Redirect unauthorized user
    //   return false;
    // }

    return true;
  } else {
    _router.navigate(['/login']);
    return false;
  }
};

// export const canLeaveEditPage: CanDeactivateFn<LoginComponent> = (component) => {
// if (Component.submitted) {
//   return true;
// }
//   if (component.isFormDirty() || component.enteredData()) {
//     return confirm('Are you sure you want to leave this page?');
//   }
//   return true;
// };
