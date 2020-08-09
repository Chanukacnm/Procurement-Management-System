import { Injectable } from '@angular/core';
import { company } from '../models/company';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Groupcompany } from '../models/groupcompany';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  companyList: company[];

  constructor(private router: Router, private http: HttpClient) { }

  getcompanyList() {

    return this.http.get("https://localhost:44353/api/Company/GetAllCompany", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
    
  }

  getCompanyGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Company/GetCompanyrGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });


  }

  getGroupCompanyList(objCompany: company ): Observable<DataGridTable> {
    var data = JSON.stringify(objCompany);
    return this.http.post<DataGridTable>("https://localhost:44353/api/Company/GetGroupCompanyrGrid/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  saveCompany(objCompany: company , isEditMode: boolean): any {

    var data = JSON.stringify(objCompany);

    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Company/SaveCompanyAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })

      });

    }
    else {

      return this.http.post("https://localhost:44353/api/Company/UpdateCompanyAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }


}
