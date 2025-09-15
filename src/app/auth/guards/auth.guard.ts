import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return true;
  } else {
    router.navigate(['/Dashboard']);
    return false;
  }
};