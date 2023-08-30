import { Component } from '@angular/core';
import { Table } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccupyTableModalComponent } from '../occupy-table-modal/occupy-table-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent {
  tables: Table[] = [];

  constructor(
    private tableService: TableService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.updateList()
  }

  onAssign(tableNumber: number): void {
    console.log('onAssign', tableNumber)
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

  onFree(tableNumber: number): void {
    this.tableService.free(tableNumber).subscribe({
      next: () => this.updateList(),
      error: this.handleError.bind(this)
    })
  }

  private updateList(): void {
    this.tableService.list().subscribe({
      next: tables => this.tables = tables,
      error: this.handleError.bind(this)
    });
  }

  private handleError(error: any): void {
    console.error(error)
  }
}
