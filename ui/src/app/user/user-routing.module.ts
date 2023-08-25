import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { loginGuard } from '../core/guards/login.guard';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
      { path: 'register', component: RegistrationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
