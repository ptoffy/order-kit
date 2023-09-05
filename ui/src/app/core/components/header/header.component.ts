import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User, UserRole } from '../../models/user.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService
  isLoggedIn: boolean
  currentUserRole: UserRole | null = null
  UserRole = UserRole
  notifications: string[] = []

  private subscription!: Subscription;

  constructor(
    @Inject(AuthService) authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.authService = authService
    this.isLoggedIn = this.authService.isAuthenticated()
    if (this.isLoggedIn) {
      this.currentUserRole = this.authService.getCurrentUserRole()
    }
    this.notificationService.notifications$.subscribe(messages => {
      this.notifications = messages
    })
  }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated
      if (this.isLoggedIn) {
        this.currentUserRole = this.authService.getCurrentUserRole()
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  logout() {
    this.authService.logout()
    this.isLoggedIn = false
    this.router.navigate(['/'])
  }

  removeNotification(message: string): void {
    this.notificationService.removeNotification(message)
  }
}

