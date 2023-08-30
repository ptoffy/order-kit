import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TableRoutingModule } from './table-routing.module';
import { OccupyTableModalComponent } from './occupy-table-modal/occupy-table-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    OccupyTableModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableRoutingModule
  ]
})
export class TableModule { }
