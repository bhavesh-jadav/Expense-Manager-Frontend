import { environment } from './../../../environments/environment';
import { AuthService } from './../auth/auth.service';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpenseService {

  options: RequestOptions;

  constructor(private http: Http, private authService: AuthService) {

    let headers = new Headers();
    const token = authService.getTokenFromLoclaStorage();
    headers.append('Authorization', token);
    this.options = new RequestOptions({headers: headers});
  }

  getExpenses(category?: string) {
    if (category === undefined) {
      return this.http.post(
        environment.baseApiUrl + 'api/v1/user/expense_details',
        '',
        this.options
      );
    } else {
      return this.http.post(
        environment.baseApiUrl + 'api/v1/user/expense_details/' + category,
        '',
        this.options
      );
    }
  }

  getExpenseCategories() {
    return this.http.get(
      environment.baseApiUrl + 'api/v1/user/categories',
      this.options
     );
  }

  addExpense(expense) {
    return this.http.post(
      environment.baseApiUrl + 'api/v1/user/add_expense',
      expense,
      this.options
    );
  }

  addCategory(category) {
    return this.http.post(
      environment.baseApiUrl + 'api/v1/user/add_category',
      category,
      this.options
    );
  }

}
