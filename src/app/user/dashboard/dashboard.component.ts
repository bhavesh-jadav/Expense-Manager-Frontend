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

  monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  categoryPieChartData: any;
  showCategoryPieChart = false;
  categoryPiChartView: any[] = [600, 300];
  isNewUser = false;
  userName: string;
  monthWiseBarChartData = [];
  expenseData = [];
  dates = [];
  startDate: string;
  endDate: string;

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



  generateMonthWiseBarChartData() {


    let dates = [];
    for (let exp of this.expenseData) {
      dates.push(exp.date_added.slice(0, 7) + '-01');
    }

    let uniqueDates = [];

    for (let date of dates) {
      if (uniqueDates.indexOf(date) < 0) {
        uniqueDates.push(date);
      }
    }

    this.dates = uniqueDates.sort((n1, n2) => {
      if (n1 > n2) {
          return 1;
      } else if (n1 < n2) {
          return -1;
      }
      return 0;
    });

    for (let date of this.dates) {
      this.monthWiseBarChartData.push({
        name: date.slice(0, 7) + '-01',
        value: 0
      });
    }
    for (let exp of this.expenseData) {
      for (let data of this.monthWiseBarChartData) {
        const date_added = exp.date_added.slice(0, 7) + '-01';
        if (data.name === date_added) {
          data.value += exp.amount as number;
        }
      }
    }

    this.startDate = this.dates[0];
    this.startDate = this.dates[6];
  }

  showCategoryPiChart () {
    this.expenseService.getExpenses().subscribe(
      response => {
        this.expenseData = response.json();
        this.generateMonthWiseBarChartData();
        if (this.expenseData.length > 0) {
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
              for (let exp of this.expenseData) {
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
