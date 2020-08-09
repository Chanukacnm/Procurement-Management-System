import { Injectable } from '@angular/core';
import { Paymentmethod } from '../models/paymentmethod';
import { Status } from '../models/status';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class PaymentmethodService {

  paymentMethodList: Paymentmethod[];
  paymentMethodRowDataList = [];
  paymentMethodcolumnDefs = [];

  constructor(private http: HttpClient) { }

  getpaymentMethodList() {

    return this.http.get("https://localhost:44353/api/PaymentMethod/GetAllPaymentMethod", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getpaymentMethodGridList(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/PaymentMethod/GetPaymentMethodGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
 
  }

  
  //getpaymentMethodRowDataList() {
  //    this.paymentMethodRowDataList = [
  //      { method: 'Cash', code: '001', status: 'Active' },
  //      { method: 'Debit Card', code: '002', status: 'Active' },
  //      { method: 'Credit Card', code: '003', status: 'Active' }
  //    ];

  //    return this.paymentMethodRowDataList;

  //}

  //getpaymentMethodcolumnDefs() {
  //    this.paymentMethodcolumnDefs = [
  //      { headerName: 'Method', field: 'method', width: 150, suppressMenu: true },
  //      { headerName: 'Code', field: 'code', width: 100, suppressMenu: true },
  //      { headerName: 'Status', field: 'status', width: 100, suppressMenu: true },
  //      {
  //        headerName: 'Edit',
  //        cellRenderer: "buttonRenderer", width: 70, suppressMenu: true
  //      },
  //      {
  //        headerName: 'Delete',
  //        cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
  //      }
  //    ];

  //    return this.paymentMethodcolumnDefs;

  //}

  savePaymentMethod(objPM: Paymentmethod, isEditMode : boolean): any {

      var data = JSON.stringify(objPM);
      if (!isEditMode) {
        return this.http.post("https://localhost:44353/api/PaymentMethod/SavePaymentMethodAsync", data, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        })

      }
      else {

        return this.http.post("https://localhost:44353/api/PaymentMethod/UpdatePaymentMethodAsync/{id}", data, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        });


      }

  }

  //Deleting
  deletepaymentMethodList(objPMDelete: Paymentmethod) {
    var data = JSON.stringify(objPMDelete);
    return this.http.post("https://localhost:44353/api/PaymentMethod/DeletePaymentMethodAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }




}
