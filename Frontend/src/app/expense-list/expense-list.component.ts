import { Component, OnInit } from '@angular/core';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseService } from 'src/services/add-expense.service';
import { SharedService } from 'src/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenseData: any[] = [];
  dataBudget: any[] = [];
  filteredData: any[] = [];
  totalAmount: number = 0;
  categoryList = ['food', 'shopping', 'travel', 'health'];
  budgetForm!: FormGroup;
  categoryValue: string = '';
  selectedCategory: string = 'all';
  submitted: boolean = false;
  loading: boolean = true;
  searchExpense: string = '';
  constructor(
    private dialog: MatDialog,
    private addExpenseService: AddExpenseService,
    private fb: FormBuilder,
    private shared: SharedService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.budgetForm = this.fb.group({
      category: { value: '', disabled: true },

      amount: ['', [Validators.required]],
    });

    // this.shared.getBudget().subscribe((res) => {

    // this.dataBudget = res;

    // })

    this.addExpenseService.getAllExpense().subscribe((expense) => {
      this.expenseData = expense;
    });
  }

  calculateTotal(category: string): number {
    this.fetchCategory(category);

    this.totalAmount = this.expenseData
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);

    return this.totalAmount;
  }

  async addExpense() {
    const dialogRef = await this.dialog.open(AddExpenseComponent, {
      width: '600px',

      height: '450px',
    });
  }

  fetchCategory(category: any) {
    this.categoryValue = category;
  }

  async setBudget() {
    this.submitted = true;

    const body = {
      category: this.categoryValue,

      amount: this.budgetForm.value.amount,
    };

    await this.shared.setBudget(body).subscribe((data) => {
      alert('Budget Set Successfully');
    });

    this.reloadComponent();
  }

  async edit(id: any) {
    const dialogRef = await this.dialog.open(AddExpenseComponent, {
      width: '600px',

      height: '450px',

      data: { id, isEdit: false },
    });
  }

  async deleteExpense(id: any) {
    console.log(id);

    await this.addExpenseService.deleteExpense(id).subscribe(() => {
      alert('Deleted successfully');
    });
  }

  reloadComponent() {
    this._router
      .navigateByUrl('/expense-list', { skipLocationChange: true })
      .then(() => {
        this._router.navigate(['/expense-list']);
      });
  }
}
