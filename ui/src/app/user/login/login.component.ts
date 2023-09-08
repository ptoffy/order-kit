import { Component } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: '',
    password: ''
  }
  errorMessage: string | null = null

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  onLogin() {
    this.authService.login(this.loginRequest.username, this.loginRequest.password).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleErrors.bind(this)
    })
  }

  private handleSuccess(): void {
    this.router.navigate(['/'])
    this.notificationService.showNotification(`Welcome back, ${this.loginRequest.username}!`)
  }

  private handleErrors(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Invalid username or password.'
      return
    }
    const errors = error.error.message
    // .split(':')[1].split(',')
    // .map((err: string) => err.charAt(0) === ' ' ? err.slice(1) : err)
    // .map((err: string) => err.charAt(0).toUpperCase() + err.slice(1))
    // .map((err: string, index: number) => index === 0 ? err : '• '.concat(err))
    // .map((err: string, index: number, array: string[]) => index !== array.length - 1 ? err.concat('\n') : err)
    // .join('')
    this.errorMessage = errors || 'An error occurred during login.'
  }
}

interface LoginRequest {
  username: string
  password: string
}
