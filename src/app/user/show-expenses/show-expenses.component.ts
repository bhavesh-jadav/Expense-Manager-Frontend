import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from './../../services/expense/expense.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-show-expenses',
  templateUrl: './show-expenses.component.html',
  styleUrls: ['./show-expenses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowExpensesComponent implements OnInit {

  columns = [
    {name: 'Category'},
    {prop: 'date_added', name: 'Date Added', width: 300},
    {name: 'Description'},
    {name: 'Amount'}
  ];

  loadingIndicator = true;
  expneseData: any;

  constructor(private expneseService: ExpenseService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('category')) {
      const category = this.route.snapshot.paramMap.get('category');
      this.showExpenses(category);
    } else {
      this.showExpenses();
    }
  }

  showExpenses(category?: string) {
    this.expneseService.getExpenses(category)
    .subscribe(response => {
        this.expneseData = response.json();
        this.loadingIndicator = false;
      }, error => {
        this.loadingIndicator = false;
        this.expneseData = [];
      }
    );
  }
}
