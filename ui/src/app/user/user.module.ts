import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UserRoutingModule } from './user-routing.module'
import { ListComponent } from './list/list.component'
import { StatsComponent } from './stats/stats.component'
import { NgChartsModule } from 'ng2-charts'

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ListComponent,
    StatsComponent
  ],
  imports: [
    NgChartsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    NgbModule,
    UserRoutingModule
  ]
})
export class UserModule { }
