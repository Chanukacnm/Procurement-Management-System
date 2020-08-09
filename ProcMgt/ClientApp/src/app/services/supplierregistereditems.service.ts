import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Supplierregistereditems } from '../models/supplierregistereditems';
import { Quotationerequestheader} from '../models/quotationerequestheader';

@Injectable({
  providedIn: 'root'
})
export class SupplierregistereditemsService {

  constructor(private http: HttpClient) { }

  getsupplierRegisteredItemsList() {
    return this.http.get("https://localhost:44353/api/SupplierRegisteredItems/GetAllSupplierRegisteredItems", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSpecitemdescriptionList(objQuoationRequestHeader:Quotationerequestheader): any {
    var data = JSON.stringify(objQuoationRequestHeader);
    return this.http.post("https://localhost:44353/api/SupplierRegisteredItems/GetItemsDescription/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSupplierRegisteredItemsGrid(objSupplierRegisteredItems: Supplierregistereditems): Observable<DataGridTable> {
    var data = JSON.stringify(objSupplierRegisteredItems);
    return this.http.post<DataGridTable>("https://localhost:44353/api/SupplierRegisteredItems/GetSupplierRegisteredItemsGrid/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  saveSupplierRegisteredItems(objSupplierRegisteredItems: Supplierregistereditems): any {
    var data = JSON.stringify(objSupplierRegisteredItems);

    return this.http.post("https://localhost:44353/api/SupplierRegisteredItems/SaveSupplierRegisteredItemsAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })

    //if (!isEditMode) {

    //  return this.http.post("https://localhost:44353/api/SupplierRegisteredItems/SaveSupplierRegisteredItemsAsync", data, {
    //    headers: new HttpHeaders({
    //      "Content-Type": "application/json"
    //    })
    //  })
    //}
    //else {

    //  return this.http.post("https://localhost:44353/api/SupplierRegisteredItems/UpdateSupplierRegisteredItemsAsync", data, {
    //    headers: new HttpHeaders({
    //      "Content-Type": "application/json"
    //    })
    //  })
    //}
  }

}
