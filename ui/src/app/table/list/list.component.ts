import { Component } from '@angular/core';
import { Table } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent {
  tables: Table[] = [];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.updateList();
  }

  private updateList(): void {
    this.tableService.list().subscribe({
      next: tables => this.tables = tables,
      error: this.handleError.bind(this)
    });
  }

  private handleError(error: any): void {
    console.error(error);
  }
}
