import { RouterModule, Routes } from "@angular/router";
import { UserRole } from "../core/models/user.model";
import { guardRole } from "../core/guards/role.guard";
import { NgModule } from "@angular/core";
import { PreparationComponent } from "./preparation/preparation.component";
import { StatusComponent } from "./status/status.component";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  {
    path: 'order',
    children: [
      { path: 'preparation', component: PreparationComponent, canActivate: [guardRole([UserRole.Cook, UserRole.Bartender, UserRole.Waiter])] },
      { path: 'status', component: StatusComponent, canActivate: [guardRole([UserRole.Waiter, UserRole.Cashier])] },
      { path: 'create', component: CreateComponent, canActivate: [guardRole([UserRole.Waiter])] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
