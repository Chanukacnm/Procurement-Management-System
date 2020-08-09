import { Injectable } from '@angular/core';
import { Purchaserequest } from '../models/purchaserequest';
import { ResultTransfer } from '../helpers/result-transfer';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Approvalscreen} from '../models/approvalscreen';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApprovalscreenService {

  
  approvalScreencolumnDefs = [];
  approvalScreenRowData = [];

  constructor(private http: HttpClient) { }


  //getapprovalScreenList(): Observable<DataGridTable> {
  //  const url = 'https://localhost:44353/api/ApprovalScreen/GetApprovalScreenGrid';
  //  return this.http.get<DataGridTable>(url, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  });

  //}

  getapprovalScreenList(objuser: User): Observable<DataGridTable> {
    var data = JSON.stringify(objuser);
    return this.http.post<DataGridTable>("https://localhost:44353/api/ApprovalScreen/GetApprovalScreenGrid", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  saveApprovalScreen(objApprovalScreen: Approvalscreen, isEditMode: boolean): any {
    
    var data = JSON.stringify(objApprovalScreen);

    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/ItemRequest/SaveItemRequestAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    else {

      return this.http.post("https://localhost:44353/api/ItemRequest/UpdateItemRequestAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  
  }
  //getapprovalScreencolumnDefs() {
  //  this.approvalScreencolumnDefs = [
  //    { headerName: 'Request Department', field: 'department', width: 180, suppressMenu: true },
  //    { headerName: 'Request Title', field: 'reqTitle', width: 180, suppressMenu: true },
  //    { headerName: 'Request Date', field: 'reqDate', width: 150, suppressMenu: true },
  //    //{ headerName: 'Priority Level', field: 'level', width: 150, suppressMenu: true, cellStyle: { color: 'red'/*, 'background-color': 'green'*/ } },
  //    { headerName: 'Request User', field: 'user', width: 150, suppressMenu: true },
  //    {
  //      headerName: 'Action',
  //      cellRenderer: "actionbuttonRenderer", width: 100, suppressMenu: true

  //    },
  //    {
  //      headerName: 'More Details',
  //      cellRenderer: "moredetailsbuttonRenderer", width: 140, suppressMenu: true
  //    }
  //  ];
  //  return this.approvalScreencolumnDefs;
  //}

  //getapprovalScreenRowData() {
  //  this.approvalScreenRowData = [
  //    { department: 'Finance Department', reqTitle: 'Audit Report', reqDate: '25/7/2019', /*level: 'Division Approval',*/ user: 'User 1' },
  //    { department: 'HR Department', reqTitle: 'Salary Report', reqDate: '25/7/2019', /*level: 'Manager Approval',*/ user: 'User 2' },
  //    { department: 'IT Department', reqTitle: 'Leave Report', reqDate: '25/7/2019', /*level: 'Director Approval',*/ user: 'User 3' },
  //    { department: 'IT Department', reqTitle: 'Salary Report', reqDate: '25/7/2019',/* level: 'Manager Approval',*/ user: 'User 4' },
  //    { department: 'HR Department', reqTitle: 'Leave Report', reqDate: '25/7/2019', /*level: 'Director Approval',*/ user: 'User 5' },
  //    { department: 'IT Department', reqTitle: 'Trip Budget', reqDate: '25/7/2019', /*level: 'Manager Approval',*/ user: 'User 6' }
  //  ];

  //  return this.approvalScreenRowData;
  //}

}
