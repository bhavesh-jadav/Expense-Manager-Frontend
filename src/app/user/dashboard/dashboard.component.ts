import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ExpenseService } from './../../services/expense/expense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categoryPieChartData: any;
  showCategoryPieChart = false;
  categoryPiChartView: any[] = [600, 300];
  isNewUser = false;
  userName: string;

  constructor(
    private expenseService: ExpenseService,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.showCategoryPiChart();
    const userData = this.authService.getCurrentUser();
    this.userName = userData.username;
  }

  showCategoryPiChart () {
    this.expenseService.getExpenses().subscribe(
      response => {
        const expenseData = response.json();
        if (expenseData.length > 0) {
          this.expenseService.getExpenseCategories().subscribe(
            responseCat => {
              const categories = responseCat.json();
              let data = [];
              for (let cat of categories.categories) {
                data.push({
                  name: cat,
                  value: 0
                });
              }
              for (let exp of expenseData) {
                for (let d of data) {
                  if (d.name === exp.category) {
                    d.value += exp.amount as number;
                  }
                }
              }
              this.categoryPieChartData = data;
              this.showCategoryPieChart = true;
            }
          );
        } else {
          this.isNewUser = true;
        }
      }
    );
  }

  onSelect(event) {
    this.route.navigate(['user/showexpenses', event.name]);
  }
}
