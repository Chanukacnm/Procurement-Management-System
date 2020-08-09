import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Contactdetails } from '../models/contactdetails';
import { Suppliermaster } from '../models/suppliermaster';

@Injectable({
  providedIn: 'root'
})
export class ContactdetailsService {

  constructor(private http: HttpClient) { }

  //getContactDetailsGrid(): Observable<DataGridTable> {

  //  const url = 'https://localhost:44353/api/ContactDetails/ContactDetails';
  //  return this.http.get<DataGridTable>(url, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  });
  //}

  getContactList(objContactDetails: Contactdetails): Observable<DataGridTable> {
    var data = JSON.stringify(objContactDetails);
    return this.http.post<DataGridTable>("https://localhost:44353/api/ContactDetails/ContactDetailsList/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getEditContactDetailsGrid(objSupplierMaster): Observable<DataGridTable> {
    var data = JSON.stringify(objSupplierMaster);
    console.log("bbbc=>", objSupplierMaster);

    return this.http.post<DataGridTable>("https://localhost:44353/api/Supplier/ContactDetailsGrid", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  saveContactDetails(objContactDetails: Contactdetails):any {
    var data = JSON.stringify(objContactDetails);

    return this.http.post("https://localhost:44353/api/ContactDetails/SaveContactDetailsAsync", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })


    //if (!isEditMode) {

      
    //}
    //else {

    //  //return this.http.post("https://localhost:44353/api/ContactDetails/UpdateSupplierAsync", data, {
    //  //  headers: new HttpHeaders({
    //  //    "Content-Type": "application/json"
    //  //  })
    //  //})
    //}
  }

}
