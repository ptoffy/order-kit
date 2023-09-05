import { RouterModule, Routes } from "@angular/router";
import { UserRole } from "../core/models/user.model";
import { guardRole } from "../core/guards/role.guard";
import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { WaiterListComponent } from "./waiter-list/waiter-list.component";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  {
    path: 'order',
    children: [
      { path: 'list', component: ListComponent, canActivate: [guardRole([UserRole.Cook, UserRole.Bartender, UserRole.Waiter])] },
      { path: 'waiter-list', component: WaiterListComponent, canActivate: [guardRole([UserRole.Waiter])] },
      { path: 'create', component: CreateComponent, canActivate: [guardRole([UserRole.Waiter])] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
