import { Component } from '@angular/core';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  user: Partial<User> = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.user.username!, this.user.password!).subscribe(res => {
      console.log(res);
    });
  }
}
