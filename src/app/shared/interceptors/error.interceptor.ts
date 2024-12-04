import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let _messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error) => {
      _messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.message,
      });
      return throwError(() => error);
    })
  );
};
