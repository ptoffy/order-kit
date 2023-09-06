import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { guardAuth } from '../core/guards/login.guard';
import { ListComponent } from './list/list.component';
import { guardRole } from '../core/guards/role.guard';
import { UserRole } from '../core/models/user.model';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent, canActivate: [guardAuth] },
      { path: 'register', component: RegistrationComponent },
      { path: 'list', component: ListComponent, canActivate: [guardRole([UserRole.Cashier])] },
      { path: 'stats', component: StatsComponent, canActivate: [guardRole([UserRole.Cashier])] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
