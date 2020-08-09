import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Approver} from '../models/approver';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApproverService {

  approverList : Approver[];

  constructor(private router: Router, private http: HttpClient) { }

  getapproverList() {
    return this.http.get("https://localhost:44353/api/Approver/GetAllApprover", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
