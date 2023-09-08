import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UserModule } from './user/user.module'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { HomeModule } from './home/home.module'
import { HeaderComponent } from './core/components/header/header.component'
import { TableModule } from './table/table.module'
import { OrderModule } from './order/order.module'
import { AuthService } from './core/services/auth.service'
import { ApiService } from './core/services/api.service'
import { NotificationService } from './core/services/notification.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TokenInterceptor } from './core/interceptors/token.interceptor'
import { ErrorInterceptor } from './core/interceptors/error.interceptor'
import { NotificationComponent } from './core/components/notification/notification.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeaderComponent,
    FormsModule,
    NgbModule,
    HomeModule,
    UserModule,
    TableModule,
    OrderModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ApiService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
