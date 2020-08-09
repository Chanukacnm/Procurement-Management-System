import { Injectable } from '@angular/core';
import { Minimumitemscapacity } from '../models/minimumitemscapacity';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MinimumItemsCapacityService {

  constructor(private router: Router, private http: HttpClient) { }
  getminimumcapacityList() {
    return this.http.get("https://localhost:44353/api/MinimumCapacity/GetAllMinimumCapacity", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
