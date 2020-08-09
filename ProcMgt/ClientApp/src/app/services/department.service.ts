import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { ResultTransfer } from '../helpers/result-transfer';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentList: Department[];
  departmentRowDataList = [];
  departmentcolumnDefs = [];

  constructor(private http: HttpClient) { }

  getdepartmentGrid() : Observable<DataGridTable> { 
    const url = 'https://localhost:44353/api/Department/GetDepartmentGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
    
  }

  getdepartmentList() {
    return this.http.get("https://localhost:44353/api/Department/GetAllDepartment", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSpecDepartmentList(objUserAccount: User): any {
    var data = JSON.stringify(objUserAccount);
    return this.http.post("https://localhost:44353/api/Department/GetSpecDepartment/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }


  

  saveDepartment(objDepartment: Department, isEditMode: boolean): any {
    var data = JSON.stringify(objDepartment);

    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Department/SaveDepartmentAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    else {

      return this.http.post("https://localhost:44353/api/Department/UpdateDepartmentAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  }


  deleteDepartmentList(objDepartmentDelete: Department) {
    var data = JSON.stringify(objDepartmentDelete);
    return this.http.post("https://localhost:44353/api/Department/DeleteDepartmentAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }

}
