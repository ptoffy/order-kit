import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function authGuard(
  redirectUrl: string
): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
      return true;
    }

    authService.redirectUrl = redirectUrl;

    return router.navigate(['/login']);
  };
}
