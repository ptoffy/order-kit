import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TableRoutingModule } from './table-routing.module';
import { OccupyTableModalComponent } from './occupy-table-modal/occupy-table-modal.component';
import { FormsModule } from '@angular/forms';
import { PayModalComponent } from './pay-modal/pay-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    OccupyTableModalComponent,
    PayModalComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    TableRoutingModule
  ]
})
export class TableModule { }
