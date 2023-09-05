import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { WaiterListComponent } from './waiter-list/waiter-list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    WaiterListComponent,
    CreateComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    SlicePipe,
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
