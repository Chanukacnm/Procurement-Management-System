import { Injectable } from '@angular/core';
import { Accounttype } from '../models/accounttype';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccounttypeService {

  
  constructor(private router: Router, private http: HttpClient) { }

  getaccountTypeList() {
    return this.http.get("https://localhost:44353/api/AccountType/GetAllAccountType", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
