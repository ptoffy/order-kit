import { Component } from '@angular/core';
import { User, UserRole } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent {
  user: Partial<User> = {};
  userRoles = Object.values(UserRole);
  errorMessage: string | null = null;  // Add this line

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister(): void {
    this.authService.register(this.user as User).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleErrors.bind(this)
    });
  }

  private handleSuccess(): void {
    this.router.navigate(['/']);
  }

  private handleErrors(error: any): void {
    const errors = (typeof error.error === 'string' ? error.error : error.error.message)
      .split(/[:,]/)
      .map((err: string) => err.charAt(0) === ' ' ? err.slice(1) : err)
      .map((err: string) => err.charAt(0).toUpperCase() + err.slice(1))
      .map((err: string, index: number) => index === 0 ? err : '• '.concat(err))
      .map((err: string, index: number, array: string[]) => index !== array.length - 1 ? err.concat('\n') : err)
      .join('');
    this.errorMessage = errors || 'An error occurred during registration.';
  }
}
