import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { StatusComponent } from './status/status.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PreparationComponent } from './preparation/preparation.component';

@NgModule({
  declarations: [
    PreparationComponent,
    StatusComponent,
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
