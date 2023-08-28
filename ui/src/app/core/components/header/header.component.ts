import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService;
  isLoggedIn: boolean
  currentUserRole: UserRole | null = null;
  UserRole = UserRole;

  private subscription!: Subscription;

  constructor(@Inject(AuthService) authService: AuthService, private router: Router) {
    this.authService = authService;
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.currentUserRole = this.authService.getCurrentUserRole();
    }
  }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      if (this.isLoggedIn) {
        this.currentUserRole = this.authService.getCurrentUserRole();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}

