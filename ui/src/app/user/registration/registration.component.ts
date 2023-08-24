import { Component } from '@angular/core';
import { User, UserRole } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registration',
  template: `
    <p>
      registration works!
    </p>
  `,
  styles: [
  ]
})
export class RegistrationComponent {
  user: Partial<User> = {};
  userRoles = Object.values(UserRole);

  constructor(private authService: AuthService) { }

  // onRegister(): void {
  //   this.authService.register(this.user).subscribe(res => {
  //     console.log(res);
  //   }
  //   );
  // }
}
