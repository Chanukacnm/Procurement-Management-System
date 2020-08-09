import { Injectable } from '@angular/core';
import { Approvalpatterntype } from '../models/approvalpatterntype';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class ApprovalpatterntypeService {

  
  approvalPatternTypecolumnDefs = [];
  approvalPatternTypeRowData = [];

  constructor(private router: Router, private http: HttpClient) { }

  getApprovalPattternTypeList() {

    return this.http.get("https://localhost:44353/api/ApprovalPatternType/GetAllApprovalPatternType", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });


  }

  getApprovalPatternTypeGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/ApprovalPatternType/GetApprovalPatternTypeGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  saveApprovalPatternType(objApprovalPatternType: Approvalpatterntype, isEditMode: boolean): any {

    var data = JSON.stringify(objApprovalPatternType);

    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/ApprovalPatternType/SaveApprovalPatternTypeAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    } else {
      return this.http.post("https://localhost:44353/api/ApprovalPatternType/UpdateApprovalPatternTypeAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })

    }
    
  }

  deleteApprovalPatternType(objApprovalPatternType: Approvalpatterntype) {
    var data = JSON.stringify(objApprovalPatternType);

    return this.http.post("https://localhost:44353/api/ApprovalPatternType/DeleteApprovalPatternTypeAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

}
