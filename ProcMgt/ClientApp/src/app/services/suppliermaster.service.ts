import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Suppliermaster } from '../models/suppliermaster';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Contactdetails } from '../models/contactdetails';

@Injectable({
  providedIn: 'root'
})
export class SuppliermasterService {

  constructor(private http: HttpClient) { }

  saveSupplierMaster(objSupplierMaster: Suppliermaster, isEditMode: boolean): any {
    
    var data = JSON.stringify(objSupplierMaster);
    
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Supplier/SaveSupplierAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })

      }); 
     
    }
    else { 

      return this.http.post("https://localhost:44353/api/Supplier/UpdateSupplierAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }   

  }

  getSupplierMasterGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/Supplier/GetSupplierGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSupplierMasterList() {
    return this.http.get("https://localhost:44353/api/Supplier/GetAllSupplier", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })


    });
  }

  deleteSupplierMaster(objSupplierMaster: Suppliermaster) {

    var data = JSON.stringify(objSupplierMaster);

    return this.http.post("https://localhost:44353/api/Supplier/DeleteSupplierAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

}
