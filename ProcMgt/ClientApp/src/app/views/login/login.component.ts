import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';

//import { BrowserModule } from '@angular/platform-browser';

//@NgModule({
//  imports: [
//    FormsModule,
//    BrowserModule
//  ]
//})

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})




export class LoginComponent {

  constructor(private authService: AuthService) {

  }

  onLogin(form) {
    let credential = form.value;
    this.authService.loginIn(credential);
  }

  RegisterUser() {

  }

}
