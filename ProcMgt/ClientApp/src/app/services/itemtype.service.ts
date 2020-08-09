import { Injectable } from '@angular/core';
import { Itemtype } from '../models/itemtype';
import { Purchaserequest } from '../models/purchaserequest';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class ItemtypeService {

  itemTypecolumnDefs = [];
  itemTypeRowData = [];

  constructor(private router: Router, private http: HttpClient) { }


  getItemTypeList() {

    return this.http.get("https://localhost:44353/api/ItemTypeMaster/GetAllItemTypeMaster", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })


    });
     
  } 

  getSpecitemtypemasterList(objPurchaseRequest: Purchaserequest ): any {
    var data = JSON.stringify(objPurchaseRequest);
    return this.http.post("https://localhost:44353/api/ItemTypeMaster/GetSpecItemTypeAll/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getitemTypeMasterGridList(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/ItemTypeMaster/GetItemTypeMasterGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }
  saveItemType(objitemtypemaster: Itemtype, isEditMode: boolean): any {
    var data = JSON.stringify(objitemtypemaster);
    if (!isEditMode) {

    return this.http.post("https://localhost:44353/api/ItemTypeMaster/SaveItemTypeMasterAsync", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

    }
    else {

      return this.http.post("https://localhost:44353/api/ItemTypeMaster/UpdateItemTypeMasterAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  
    

  }

  deleteItemtypeList(objitemtypemasterDelete: Itemtype) {
    var data = JSON.stringify(objitemtypemasterDelete);
    return this.http.post("https://localhost:44353/api/ItemTypeMaster/DeleteItemTypeMasterAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }
}

