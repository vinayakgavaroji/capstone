import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(){}

  loggedIn : boolean = false;

  ngOnInit() {
    this.localS()
  }
  
  title = 'Frontend';

  localS(){
    if(localStorage.getItem('token') === null){
      localStorage.removeItem('token');
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }
  }

}
