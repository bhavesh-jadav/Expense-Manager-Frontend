import { ExpenseService } from './../../services/expense/expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addButtonDisabled = false;
  addButtonText = 'Add';
  successfullyAdded = false;
  showAddCategoryForm = true;

  addCategoryForm = new FormGroup({
    'categoryname': new FormControl('', [Validators.required])
  });

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      this.addButtonDisabled = true;
      this.addButtonText = 'Adding...';
      const category = {
        name: this.categoryNameFormControl.value
      };
      this.expenseService.addCategory(category).subscribe(
        response => {
          this.addButtonDisabled = false;
          this.addButtonText = 'Add';
          this.showAddCategoryForm = false;
          this.addCategoryForm.reset();
          setTimeout(() => this.showAddCategoryForm = true, 0);
          this.successfullyAdded = true;
        }
      );
    }
  }

  get categoryNameFormControl() {
    return this.addCategoryForm.get('categoryname');
  }
}
