import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { GroupItemsPipe } from './group-items.pipe';



@NgModule({
  declarations: [
    GroupItemsPipe,
    ListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
