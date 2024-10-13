import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'expense-list', 
    loadChildren : () => import('../modules/expense-list/expense-list.module').then(m => m.ExpenseListModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard] 
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
  // { path: 'navbar', component: NavbarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
