import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthApiService } from '../shared/services/auth-api';
import { map, take } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

export const authGuard: CanActivateFn = () => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);

  return toObservable(authApi.currentUser).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};

export const guestGuard: CanActivateFn = () => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);

  return toObservable(authApi.currentUser).pipe(
    take(1),
    map((user) => {
      if (!user) {
        return true;
      } else {
        router.navigate(['/dashboard']);
        return false;
      }
    })
  );
};
