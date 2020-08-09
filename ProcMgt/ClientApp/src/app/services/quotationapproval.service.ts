import { Injectable } from '@angular/core';
import { Quotationerequestheader } from '../models/quotationerequestheader';
import { ResultTransfer } from '../helpers/result-transfer';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Quotationapproval } from '../models/quotationapproval';


@Injectable({
  providedIn: 'root'
})
export class QuotationapprovalService {

  constructor(private http: HttpClient) { }

  getquotationapprovalList(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/QuotationApproval/GetQuotationApprovalGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  savequotationApproval(objQuotationApproval: Quotationapproval, isEditMode: boolean): any {
   
    var data = JSON.stringify(objQuotationApproval);
   
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/QuotationRequestHeader/SaveQuotationRequestHeaderAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    else {

      return this.http.post("https://localhost:44353/api/QuotationRequestHeader/UpdateQuotationRequestHeaderAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }
}



