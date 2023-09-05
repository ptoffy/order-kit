import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { GroupItemsPipe } from './group-items.pipe';
import { WaiterListComponent } from './waiter-list/waiter-list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GroupItemsPipe,
    ListComponent,
    WaiterListComponent,
    CreateComponent
  ],
  imports: [
    FormsModule,
    SlicePipe,
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
