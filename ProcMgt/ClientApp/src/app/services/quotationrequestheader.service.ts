import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Quotationerequestheader } from '../models/quotationerequestheader';


@Injectable({
  providedIn: 'root'
})
export class QuotationrequestheaderService {

  constructor(private http: HttpClient) { }

  getQuotationRequestHeaderGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/QuotationRequestHeader/GetQuotationRequestGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getQuotationRequestDetailsGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/QuotationRequestHeader/GetQuotationRequestDetailsGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getQuotationRequestHeaderList() {
    return this.http.get("https://localhost:44353/api/QuotationRequestHeader/GetAllQuotationRequest", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })


    });
  }

  saveQuotationRequestHeader(objQuoationRequestHeader: Quotationerequestheader, isEditMode: boolean): any {
    
    var data = JSON.stringify(objQuoationRequestHeader);
    console.log("aaa=>",data);
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
