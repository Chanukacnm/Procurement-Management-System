import { Injectable } from '@angular/core';
import { Designation } from '../models/designation';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  

  constructor(private http: HttpClient) { }

  getdesignationList() {
    return this.http.get("https://localhost:44353/api/Designation/GetAllDesignation", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getdesignationGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Designation/GetDesignationGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  saveDesignation(objDesignation: Designation, isEditMode: boolean): any {

    var data = JSON.stringify(objDesignation);

    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Designation/SaveDesignationAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    else {
      return this.http.post("https://localhost:44353/api/Designation/UpdateDesignationAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  }

}

