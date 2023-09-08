import { RouterModule, Routes } from "@angular/router";
import { UserRole } from "../core/models/user.model";
import { guardRole } from "../core/guards/role.guard";
import { ListComponent } from "./list/list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'tables',
    children: [
      { path: 'list', component: ListComponent, canActivate: [guardRole([UserRole.Waiter, UserRole.Cashier])] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
