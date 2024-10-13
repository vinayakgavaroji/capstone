import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();
  
  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  login(): Observable<any> {
    return this.http
    .get<any>(this._url + '/getAllUsers')
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
    );
  }

  signUp(body: any): Observable<any> {
    return this.http.post<any>(this._url + '/api/signup', body);
  }

  setBudget(body: any) {
    return this.http.post(this._url + '/budgets/', body);
  }

  getBudget(): Observable<any> {
    return this.http.get<any>(this._url + '/budgets/');
  }

  calculateTotalAmountByCategory(): Observable<any> {
    return this.http.get<any>(this._url + '/getTotalAmountByCatgeory')
  }
}
