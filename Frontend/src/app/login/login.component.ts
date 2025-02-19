import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  submitted: boolean = false;
  public userData: any[] = [];
  successMsg: string = '';
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private _r: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/),
          Validators.min(8),
        ],
      ],
    });
  }

  login() {
    // this.submitted = true;

    // this.shared.userLogin(this.loginForm.value).subscribe(
    //   (user) => {
    //     if (user) {
    //       this._r.navigate(['/expense-list']);
    //     }
    //   },
    //   (err) => {
    //     this.errorMsg = err.error.message;
    //   }
    // );
    this.submitted = true;
    this.auth.login({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe(() =>{
      this._r.navigate(['/expense-list']);
    },
    (err) => {
      this.errorMsg = err.error.message;
    }
  );
  }
}
