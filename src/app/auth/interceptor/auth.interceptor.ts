import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }
  const authReq = token
    ? req.clone({
      setHeaders: {
        token: token
      }
    })
    : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.error('Unauthorized - redirecting to login');
        console.log(error);

      }
      return throwError(() => error);
    })
  );
};