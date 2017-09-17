import { HomeService } from './services/home/home.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable/release';
import { HomeModule } from './home/home.module';
import { RoutingModule } from './routing/routing.module';
import { AuthService } from './services/auth/auth.service';
import { HttpModule } from '@angular/http';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    UserModule,
    RoutingModule,
    HomeModule,
    NgxDatatableModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
