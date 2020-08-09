import { Injectable } from '@angular/core';
import { Supplieritems } from '../models/supplieritems';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SupplieritemsService {

  SupplierRegisteredItems: Supplieritems[];

  constructor(private router: Router, private http: HttpClient) { }

  getSupplierRegisteredItems() {
    return this.http.get("https://localhost:44353/api/SupplierItems/GetAllSupplierItems", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
