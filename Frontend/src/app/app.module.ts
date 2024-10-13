import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FilterByCategoryPipe } from 'src/pipes/filter-by-category.pipe';
import { SeachByExpensePipe } from 'src/pipes/seach-by-expense.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';
import { ExpenseListModule } from 'src/modules/expense-list/expense-list.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SignUpComponent,
    ExpenseListComponent,
    AddExpenseComponent,
    FilterByCategoryPipe,
    SeachByExpensePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ExpenseListModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
