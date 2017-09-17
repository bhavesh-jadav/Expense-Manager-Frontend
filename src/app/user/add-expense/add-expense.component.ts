import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from './../../services/expense/expense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  constructor(private expenseService: ExpenseService) { }

  addExpenseForm = new FormGroup({
    'category': new FormControl('', [Validators.required]),
    'amount': new FormControl('', [Validators.required]),
    'description': new FormControl()
  });

  categories: any;
  categoriesLoaded = false;
  addButtonDisabled = false;
  addButtonText = 'Add';
  successfullyAdded = false;

  ngOnInit() {
    this.expenseService.getExpenseCategories().subscribe(
      response => {
        this.categories = response.json().categories;
        this.categoriesLoaded = true;
      }
    );
  }

  addExpense() {
    if (this.addExpenseForm.valid) {
      this.addButtonDisabled = true;
      this.addButtonText = 'Adding...';
      const expense = {
        category: this.categoryFormControl.value,
        amount: this.amountFormControl.value,
        description: this.descriptionFormControl.value
      };
      this.expenseService.addExpense(expense).subscribe(
        response => {
          this.addButtonDisabled = false;
          this.addButtonText = 'Add';
          this.categoriesLoaded = false;
          this.addExpenseForm.reset();
          setTimeout(() => this.categoriesLoaded = true, 0);
          this.successfullyAdded = true;
        }
      );
    }
  }

  get categoryFormControl(){
    return this.addExpenseForm.get('category');
  }

  get amountFormControl(){
    return this.addExpenseForm.get('amount');
  }

  get descriptionFormControl(){
    return this.addExpenseForm.get('description');
  }
}
