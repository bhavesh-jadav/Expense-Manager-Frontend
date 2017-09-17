import { AuthGuardService } from './../services/auth-guard/auth-guard.service';
import { ErrorComponent } from '../error/error.component';
import { HOME_ROUTES } from '../home/home.module';
import { HomeComponent } from './../home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UserModule, USER_ROUTES } from './../user/user.module';
import { UserComponent } from './../user/user.component';
import { RegisterComponent } from './../home/register/register.component';
import { LoginComponent } from './../home/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: HOME_ROUTES
  },
  {
    path: 'user',
    component: UserComponent,
    children: USER_ROUTES,
    canActivate: [AuthGuardService]
  },
  {
    path: 'error/:code',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error/404'
  },
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
