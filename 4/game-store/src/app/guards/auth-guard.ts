import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // User is logged in, allow access to the route
    return true;
  } else {
    alert('Please login to view this content.');
    
    // Redirect to login page and keep track of where they wanted to go
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
};