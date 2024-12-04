import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('cart') || req.url.includes('orders')) {
    const token = localStorage.getItem('userToken');
    if (token) {
      req = req.clone({
        setHeaders: {
          token: `${token}`,
        },
      });
    }
  }
  return next(req); // after Interceptor
};
