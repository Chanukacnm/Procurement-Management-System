import { Injectable } from '@angular/core';
import { Bank } from '../models/bank';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private router: Router, private http: HttpClient) { }

  getbankList() {
    return this.http.get("https://localhost:44353/api/Bank/GetAllBank", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
