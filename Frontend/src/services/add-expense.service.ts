import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddExpenseService {

  private _url = 'http://localhost:3000/'
 
  constructor(private http: HttpClient) { }
 
  editExpense(id:any, body: any): Observable<any>{
 
   return this.http.put<any>(this._url+'updateExpense/'+id, body);
 
  }
 
  getDetailsById(expenseId: any): Observable<any>{
 
   return this.http.get<any>(this._url+'getExpenseById/' + expenseId);
 
  }
 
  getAllExpense():Observable<any>{
 
   return this.http.get<any>(this._url+'getAllExpenses');
 
  }
 
  deleteExpense(id: any):Observable<any>{
 
   return this.http.delete<any>(this._url+'deleteExpense/'+id)
 
  }
 
  addExpense(body: any): Observable<any>{
 
   return this.http.post<any>(this._url+'addExpenses', body);
 
  }
 
 }
