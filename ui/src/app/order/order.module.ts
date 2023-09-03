import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { GroupItemsPipe } from './group-items.pipe';
import { WaiterListComponent } from './waiter-list/waiter-list.component';



@NgModule({
  declarations: [
    GroupItemsPipe,
    ListComponent,
    WaiterListComponent
  ],
  imports: [
    SlicePipe,
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
