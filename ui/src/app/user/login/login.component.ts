import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.loginRequest.username, this.loginRequest.password).subscribe();
  }
}

interface LoginRequest {
  username: string;
  password: string;
}
