import { RouterModule, Routes } from "@angular/router";
import { UserRole } from "../core/models/user.model";
import { guardRole } from "../core/guards/role.guard";
import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: 'order',
    children: [
      { path: 'list', component: ListComponent, canActivate: [guardRole(UserRole.Cook)] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
