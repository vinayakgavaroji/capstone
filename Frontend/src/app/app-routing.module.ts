import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'expense-list', component: ExpenseListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
