import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(user: { email: string; password: string }) {
    const loginUrl = 'http://localhost:3000/api/login';

    return this.http.post<any>(loginUrl, user).pipe(
      tap(response => {
        if (response.user._id) {
          localStorage.setItem('token', response.user._id);
          this.loggedIn.next(true);
        }
      })
    );
  }

  async logout() {
    await localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  
}
