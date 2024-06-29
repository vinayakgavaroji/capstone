import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signInForm! : FormGroup;
 
  successMsg: string = "";
 
  errorMsg: string = "";
 
  submitted:boolean = false;
 
  verify: any[] = [];
 
  constructor(private fb: FormBuilder, private shared: SharedService, private _r: Router){}
 
  ngOnInit() {
 
   this.signInForm = this.fb.group({
 
    // userId: ['', [Validators.required, Validators.maxLength(4)]],
 
    username: ['', [Validators.required]],
 
    email: ['', [Validators.required, Validators.email]],
 
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)]]
 
   })
 
   this.shared.login().subscribe((data) => {
 
    this.verify = data.users;
 
   })
 
  }
 
  signUp(){
 
   this.submitted = true;
 
   this.verify.forEach((user) => {
 
    if(user.email !== this.signInForm.value.email){
 
     this.shared.signUp(this.signInForm.value).subscribe((data) => {
 
      console.log(data)
 
      this.successMsg = "User registered successfully";
 
      alert(this.successMsg)
 
      this._r.navigate(['/login']);
 
     })
 
    } else {
 
     this.errorMsg = "User already exists, Please login in";
 
    }
 
   })
 
  }
 
 }
