import { RouterModule, Routes } from "@angular/router";
import { UserRole } from "../core/models/user.model";
import { guardRole } from "../core/guards/role.guard";
import { ListComponent } from "./list/list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'table',
    children: [
      { path: 'list', component: ListComponent, canActivate: [guardRole(UserRole.Waiter)] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
