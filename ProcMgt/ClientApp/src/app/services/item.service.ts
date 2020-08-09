import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Purchaserequest } from '../models/purchaserequest';
import { Itemview } from '../models/itemview';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  

  constructor(private http: HttpClient) { }

  getitemList() {
    return this.http.get("https://localhost:44353/api/Item/GetAllItem", { 
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSpecIemList(objPurchaseRequest : Purchaserequest): any {
    var data = JSON.stringify(objPurchaseRequest);
    return this.http.post("https://localhost:44353/api/Item/GetSpecItemAll/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }


  getItemByID(objItem: Item) {
    var data = JSON.stringify(objItem);
    return this.http.post("https://localhost:44353/api/Item/GetItemByID/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }


  getItemGridList(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Item/GetItemGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }



  saveItem(objitemView: Itemview, isEditMode: boolean): any {

    var data = JSON.stringify(objitemView);
    console.log("data=>" , data);
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Item/SaveItemAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }
    else {

      return this.http.post("https://localhost:44353/api/Item/UpdateItemAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  }

  deleteItemList(objItemDelete: Item) {
    var data = JSON.stringify(objItemDelete);
    return this.http.post("https://localhost:44353/api/Item/DeleteItemAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }


}
