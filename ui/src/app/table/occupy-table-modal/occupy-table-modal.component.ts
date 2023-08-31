import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-occupy-table-modal',
  templateUrl: './occupy-table-modal.component.html',
  styles: [
  ]
})
export class OccupyTableModalComponent {
  @Input() tableNumber: number
  @Input() tableCapacity: number
  peopleCount: number = 2

  constructor(public activeModal: NgbActiveModal) {
    this.tableNumber = -1
    this.tableCapacity = -1
  }

  onOccupyTable(): void {
    if (!this.peopleCount || this.peopleCount <= 0 || this.peopleCount > this.tableCapacity) return
    this.activeModal.close(this.peopleCount)
  }

  isValid(): boolean {
    return this.peopleCount > 0 && this.peopleCount <= this.tableCapacity
  }
}
