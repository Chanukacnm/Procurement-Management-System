import { Injectable } from '@angular/core';
import { Suppliertype } from '../models/suppliertype';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuppliertypeService {

  supplierTypeList: Suppliertype[];

  constructor(private router: Router, private http: HttpClient) { }

  getsupplierTypeList() {
    return this.http.get("https://localhost:44353/api/SupplierType/GetAllSupplierType", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
