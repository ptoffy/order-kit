import { Component } from '@angular/core'
import { Table } from 'src/app/core/models/table.model'
import { TableService } from 'src/app/core/services/table.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { OccupyTableModalComponent } from '../occupy-table-modal/occupy-table-modal.component'
import { UserRole } from 'src/app/core/models/user.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { PayModalComponent } from '../pay-modal/pay-modal.component'

@Component({
  selector: 'app-table-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent {
  tables: Table[] = []
  currentUserRole!: UserRole
  UserRole = UserRole

  constructor(
    private tableService: TableService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {
    this.currentUserRole = this.authService.getCurrentUserRole()!
  }

  ngOnInit(): void {
    this.updateList()
  }

  onAssign(tableNumber: number): void {
    this.tableService.assign(tableNumber).subscribe({
      next: () => this.updateList(),
      error: this.handleError.bind(this)
    })
  }

  onOccupyModal(tableNumber: number): void {
    const modal = this.modalService.open(OccupyTableModalComponent)
    modal.componentInstance.tableNumber = tableNumber
    modal.componentInstance.tableCapacity = this.tables.find(t => t.number === tableNumber)?.seats || 0

    modal.result.then((peopleCount: number) => {
      this.tableService.occupy(tableNumber, peopleCount).subscribe({
        next: () => this.updateList(),
        error: this.handleError.bind(this)
      })
    }, () => { })
  }

  onOpenPayModal(table: Table): void {
    const modal = this.modalService.open(PayModalComponent)
    modal.componentInstance.table = table

    modal.result.then(() => {
      this.updateList()
    })
  }

  onFree(tableNumber: number): void {
    this.tableService.free(tableNumber).subscribe({
      next: () => this.updateList(),
      error: this.handleError.bind(this)
    })
  }

  private updateList(): void {
    this.tableService.list(false, true).subscribe({
      next: tables => this.tables = tables,
      error: this.handleError.bind(this)
    })
  }

  private handleError(error: any): void {
    console.error(error)
  }
}
