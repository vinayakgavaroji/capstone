import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddExpenseService } from 'src/services/add-expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  addExpenseForm!: FormGroup;
  submitted: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';
  data: any;
  isEdit: boolean = false;
  categoryList = ['shopping', 'food', 'travel', 'health'];

  constructor(
    private fb: FormBuilder,
    private addExpense: AddExpenseService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    public dialog?: MatDialogRef<AddExpenseComponent>
  ) {
    this.data = injectedData || {};
    this.isEdit = !!this.data.id;
  }

  ngOnInit() {
    if (this.isEdit) {
      this.addExpense.getDetailsById(this.data.id).subscribe((item) => {
        let date = new Date(item.date).toLocaleDateString();
        this.addExpenseForm.patchValue({
          expenseId: item.expenseId,
          productName: item.productName,
          amount: item.amount,
          category: item.category,
          date: date,
          description: item.description,
        });
      });
    }

    this.addExpenseForm = this.fb.group({
      productName: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  addNewExpense() {
    this.submitted = true;

    if (!this.isEdit) {
      this.addExpense.addExpense(this.addExpenseForm.value).subscribe((expense) => {
        this.successMsg = expense.message;
      });
    } else {
      this.addExpense.editExpense(this.data.id, this.addExpenseForm.value).subscribe((res) => {
        this.successMsg = res.message;
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
