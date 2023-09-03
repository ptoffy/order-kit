import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { UserRole } from '../models/user.model'

export function guardRole(roles: UserRole[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    let currentUserRole = authService.getCurrentUserRole()

    if (
      authService.isAuthenticated()
      && currentUserRole
      && roles.includes(currentUserRole)
    ) {
      return true
    }

    return router.navigate(['/user/login'])
  }
}
