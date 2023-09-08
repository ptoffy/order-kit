import { Component } from '@angular/core'
import { User, UserRole } from 'src/app/core/models/user.model'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent {
  users: User[] = []
  UserRole = UserRole

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.updateList()
  }

  onDelete(username: string): void {
    this.authService.delete(username).subscribe({
      next: this.updateList.bind(this),
      error: this.handleError.bind(this)
    })
  }

  private updateList(): void {
    this.authService.list().subscribe({
      next: users => this.users = users,
      error: this.handleError.bind(this)
    })
  }

  private handleError(error: any): void {
    console.error(error)
  }
}
