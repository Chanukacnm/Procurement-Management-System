import { Injectable } from '@angular/core';
import { Purchaserequest} from '../models/purchaserequest';
import { ResultTransfer } from '../helpers/result-transfer';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PurchaserequestService {
  purchaseRequestList: Purchaserequest[];
  purchaseRequestcolumnDefs = [];
  purchaseRequestRowData = [];

   
  constructor(private http: HttpClient) { }


  //getpurchaseRequestList(): Observable<DataGridTable> {
  //  const url = 'https://localhost:44353/api/ItemRequest/GetItemRequestGrid';
  //  return this.http.get<DataGridTable>(url, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  });
  //}

  getpurchaseRequestList(objPurchaseRequest: Purchaserequest): Observable<DataGridTable> {
   
    var data = JSON.stringify(objPurchaseRequest);
    //console.log(data);

    return this.http.post<DataGridTable>("https://localhost:44353/api/ItemRequest/GetItemRequestGrid", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  //getpurchaseRequestList(objuser: User): Observable<DataGridTable> {
  //  var data = JSON.stringify(objuser);
  //  return this.http.post<DataGridTable>("https://localhost:44353/api/ItemRequest/GetItemRequestGrid", data, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  });

  //}
  
 
  //getpurchaseRequestcolumnDefs() {
  //  this.purchaseRequestcolumnDefs = [
  //    { headerName: 'Request Title', field: 'title', width: 100, suppressMenu: true },
  //    { headerName: 'Item Category', field: 'category', width: 130, suppressMenu: true },
  //    { headerName: 'Item Type', field: 'type', width: 100, suppressMenu: true},
  //    { headerName: 'Make', field: 'make', width: 100, suppressMenu: true},
  //    { headerName: 'Model', field: 'model', width: 90, suppressMenu: true},
  //    { headerName: 'Priority', field: 'priority', width: 70, suppressMenu: true },
  //    { headerName: 'Required Date', field: 'rdate', width: 130, suppressMenu: true },
  //    { headerName: 'Asset Code', field: 'asstcode', width: 100, suppressMenu: true },
  //    { headerName: 'No of Units', field: 'units', width: 100, suppressMenu: true },
  //    { headerName: 'Approver', field: 'approver', width: 100, suppressMenu: true },
  //    {
  //      headerName: 'Edit',
  //      cellRenderer: "buttonRenderer", width: 60, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Delete',
  //      cellRenderer: "deletebuttonRenderer", width: 80, suppressMenu: true
  //    }

  //  ];
  //  return this.purchaseRequestcolumnDefs;
  //}

  //getpurchaseRequestRowData() {
  //  this.purchaseRequestRowData = [
  //    { title: 'Title 1', category: 'category 1', type: 'Type 1', make: 'Toyota', model: 'Prius', priority: 'Priority 01', rdate: '2019/09/01 ', asstcode: '010', units: '1', approver: 'Approved' }
  //  ];

  //  return this.purchaseRequestRowData;
  //}

  savePurchaseRequest(objPurchaseRequest: Purchaserequest, objuser: User, isEditMode: boolean): any {
    
    var data = JSON.stringify(objPurchaseRequest);
    //var userdet = JSON.stringify(objuser);
    console.log("aaaa=>", data);
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/ItemRequest/SaveItemRequestAsync", data,  {
        headers: new HttpHeaders({
          "Content-Type": "application/json",          
        })
      });
    }
    else {

      return this.http.post("https://localhost:44353/api/ItemRequest/UpdateItemRequestAsync/{id}", data , {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }



  }

  deletePurchaseRequestList(objPurchaseRequestDelete: Purchaserequest) {
    var data = JSON.stringify(objPurchaseRequestDelete);
    return this.http.post("https://localhost:44353/api/ItemRequest/DeleteItemRequestAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }
}
