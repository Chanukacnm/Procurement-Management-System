import { Injectable } from '@angular/core';
import { Make } from '../models/make';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Model } from '../models/model';
import { Purchaserequest } from '../models/purchaserequest';
import { Item } from '../models/item';



@Injectable({
  providedIn: 'root'
})

export class MakeService {

  constructor(private http: HttpClient) { }

  makecolumnDefs = [];
  makeRowData = [];

  getMakeList() {

    return this.http.get("https://localhost:44353/api/Make/GetAllMake", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  getSpecMakeList(objModel: Model): any {
    var data = JSON.stringify(objModel);
    return this.http.post("https://localhost:44353/api/Make/GetSpecAllMake/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSpecMakeAllList(objitem: Item): any {
    var data = JSON.stringify(objitem);
    return this.http.post("https://localhost:44353/api/Make/GetSpecListMake/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }


  getSpecSecondMakeList(objPurchaseRequest : Purchaserequest): any {
    var data = JSON.stringify(objPurchaseRequest);
    return this.http.post("https://localhost:44353/api/Make/GetSpecSecondAllMake/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getMakeByID(objMake: Make) {
    var data = JSON.stringify(objMake);
    return this.http.post("https://localhost:44353/api/Make/DeleteMakeAsync/{id}", data, { 
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }

  getMakeGridList(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Make/GetMakeGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }


  //getmakecolumnDefs() {
  //  this.makecolumnDefs = [
  //    { headerName: 'Item Type', field: 'ItemType', width: 80, suppressMenu: true },
  //    { headerName: 'Make Code', field: 'MakeCode', width: 80, suppressMenu: true },
  //    { headerName: 'Make Name', field: 'MakeName', width: 100, suppressMenu: true },
  //    { headerName: 'Status', field: 'status', width: 70, suppressMenu: true },

  //    {
  //      headerName: 'Edit',
  //      cellRenderer: "buttonRenderer", width: 70, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Delete',
  //      cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
  //    }
  //  ];
  //  return this.makecolumnDefs;
  //}

  //getmakeRowData() {
  //  this.makeRowData = [
  //    { ItemType: 'Bike', MakeCode: 'Baj', MakeName: 'bajaj', status: 'Active' },
  //    { ItemType: 'Car', MakeCode: 'Toy', MakeName: 'Toyota', status: 'Inactive' },
  //    { ItemType: 'Bus', MakeCode: 'Ley', MakeName: 'Leyland', status: 'Delete' }
  //  ];

  //  return this.makeRowData;

  //}

  saveMake(objMake: Make, isEditMode: boolean): any {

    var data = JSON.stringify(objMake);
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Make/SaveMakeAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }
    else {

      return this.http.post("https://localhost:44353/api/Make/UpdateMakeAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  }

  
  deleteMakeList(objMakeDelete: Make) {
    var data = JSON.stringify(objMakeDelete);
    return this.http.post("https://localhost:44353/api/Make/DeleteMakeAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }
}
