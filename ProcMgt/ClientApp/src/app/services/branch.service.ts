import { Injectable } from '@angular/core';
import { Branch } from '../models/branch';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  branchList: Branch[];

  constructor(private router: Router, private http: HttpClient) { }

  getbranchList() {
    return this.http.get("https://localhost:44353/api/BankBranch/GetAllBankBranch", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
