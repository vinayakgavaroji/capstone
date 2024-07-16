import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FilterByCategoryPipe } from 'src/pipes/filter-by-category.pipe';
import { SeachByExpensePipe } from 'src/pipes/seach-by-expense.pipe';
import { SharedService } from 'src/services/shared.service';
import { AddExpenseService } from 'src/services/add-expense.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    SignUpComponent,
    ExpenseListComponent,
    AddExpenseComponent,
    FilterByCategoryPipe,
    SeachByExpensePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [SharedService, AddExpenseService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
