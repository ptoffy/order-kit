import { Component } from '@angular/core'
import { User, UserRole } from '../../core/models/user.model'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent {
  user: Partial<User> = {}
  userRoles = Object.values(UserRole)
  errorMessage: string | null = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister(): void {
    this.authService.register(this.user as User).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleErrors.bind(this)
    })
  }

  private handleSuccess(): void {
    this.router.navigate(['/'])
  }

  private handleErrors(error: any): void {
    const errors = error.error.message
    this.errorMessage = errors || 'An error occurred during registration.'
  }
}
