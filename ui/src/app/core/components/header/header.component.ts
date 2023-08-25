import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

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
  currentUser: User | null = null;

  private subscription!: Subscription;

  constructor(@Inject(AuthService) authService: AuthService) {
    this.authService = authService;
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
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
    this.currentUser = null;
  }
}

