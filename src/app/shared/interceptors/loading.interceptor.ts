import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let _spinner = inject(NgxSpinnerService);

  _spinner.show();
  return next(req).pipe(
    finalize(() => {
      _spinner.hide();
    }) // after Interceptor
  );
};

////
// this.spinner.show("mySpinner", {
//   type: "line-scale-party",
//   size: "large",
//   bdColor: "rgba(0, 0, 0, 1)",
//   color: "white",
//   template:
//     "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
// });
