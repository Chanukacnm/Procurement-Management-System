import { Injectable } from '@angular/core';
import { Approvalflowmanagement } from '../models/approvalflowmanagement';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class ApprovalflowmanagementService {
  
  
  constructor(private http: HttpClient) { }

  getApprovalFlowMangementList() {
    return this.http.get("https://localhost:44353/api/ApprovalFlowManagement/GetAllApprovalFlowManagement", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  getApprovalFlowMangementGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/ApprovalFlowManagement/GetApprovalFlowManagementGridAsync';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  SaveApprovalFlowManage(objApprovalflowmanagement: Approvalflowmanagement, isEditMode: boolean): any {
    var data = JSON.stringify(objApprovalflowmanagement);

    if (!isEditMode) {
      return this.http.post("https://localhost:44353/api/ApprovalFlowManagement/SaveApprovalFlowManagementAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })

      });
    }
    else {
      return this.http.post("https://localhost:44353/api/ApprovalFlowManagement/UpdateApprovalFlowManagementAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  }

  deleteApprovalFlowManage(objDelApprovalFlowManage: Approvalflowmanagement) {

    var data = JSON.stringify(objDelApprovalFlowManage);

    return this.http.post("https://localhost:44353/api/ApprovalFlowManagement/DeleteApprovalFlowManagementAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
}
