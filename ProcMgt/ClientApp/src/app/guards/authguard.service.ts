import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate() {
    var token = localStorage.getItem("jwt");
    //var token = JSON.parse(localStorage.getItem("UserDetails")).token;
    //var token = localStorage.getItem("jwtUsers");

    //console.log("JWT=>", token);

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    //add(2020/03/18)
    else {
      //this.router.navigate(["/"])
      this.router.navigate(['/login']);
      return false;
    }

    //this.router.navigate(["/"])
    ////this.router.navigate(['/login']);
    //return false;
    
  }

}
