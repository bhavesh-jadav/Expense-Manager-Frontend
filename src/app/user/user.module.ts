import { NgxDatatableModule } from '@swimlane/ngx-datatable/release';
import { ExpenseService } from '../services/expense/expense.service';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ShowExpensesComponent } from './show-expenses/show-expenses.component';
import { AddCategoryComponent } from './add-category/add-category.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'addexpense',
    component: AddExpenseComponent
  },
  {
    path: 'showexpenses',
    component: ShowExpensesComponent
  },
  {
    path: 'showexpenses/:category',
    component: ShowExpensesComponent
  },
  {
    path: 'addcategory',
    component: AddCategoryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    AddExpenseComponent,
    ShowExpensesComponent,
    AddCategoryComponent
  ],
  providers: [
    ExpenseService
  ]
})
export class UserModule { }

