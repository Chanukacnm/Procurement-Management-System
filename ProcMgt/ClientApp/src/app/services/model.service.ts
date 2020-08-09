import { Injectable } from '@angular/core';
import { Model } from '../models/model';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Purchaserequest } from '../models/purchaserequest';
import { Quotationrequestdetails } from '../models/quotationrequestdetails';
import { Make } from '../models/make';



@Injectable({
  providedIn: 'root'
})
export class ModelService {

  modelList: Model[];
  modelcolumnDefs = [];
  modelRowData = [];

  constructor(private router: Router, private http: HttpClient) { }

  getModelList() {
    return this.http.get("https://localhost:44353/api/Model/GetAllModel", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getSpecModelList(objpurchase: Purchaserequest): any {
    var data = JSON.stringify(objpurchase);
    return this.http.post("https://localhost:44353/api/Model/GetSpecModelAll/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }



  getSpecModelList2(objMake: Make): any {
    var data = JSON.stringify(objMake);
    return this.http.post("https://localhost:44353/api/Model/GetSpecModelAll/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }


  

  getModelGridList(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Model/GetModelGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  //getModelList() {
  //  this.modelList = [{ modelID: "1", modelCode: "elitebook", itemTypeID: "", makeID: "", isActive: true, modelName: "" },
  //  { modelID: "1", modelCode: "ultimate", itemTypeID: "", makeID: "", isActive: true, modelName: "" },
  //  { modelID: "1", modelCode: "hp-model", itemTypeID: "", makeID: "", isActive: true, modelName: "" }
  //  ];
  //  return this.modelList;
  //}

  //getmodelcolumnDefs() {
  //  this.modelcolumnDefs = [
  //    { headerName: 'Item Type', field: 'itemType', width: 80, suppressMenu: true },
  //    { headerName: 'Make', field: 'make', width: 70, suppressMenu: true },
  //    { headerName: 'Model Code', field: 'modelCode', width: 70, suppressMenu: true },
  //    { headerName: 'Model Name', field: 'modelName', width: 100, suppressMenu: true },
  //    { headerName: 'Image Path', field: 'imagePath', width: 150, suppressMenu: true },
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
  //  return this.modelcolumnDefs;
  //}

  //getmodelRowData() {
  //  this.modelRowData = [
  //    { itemType: 'Bike', make: 'Bajaj', modelCode: 'CT', modelName: 'CT 100', imagePath: 'C: nipuna/Downloads/Bike', status: 'Active' },
  //    { itemType: 'Car', make: 'Suzuki', modelCode: 'WR', modelName: 'Wagon R', imagePath: 'C: nipuna/Downloads/Car', status: 'Inactive' },
  //    { itemType: 'Bus', make: 'Leyland', modelCode: 'AIS52', modelName: 'Leyland-AIS52', imagePath: 'C:nipuna/Downloads/Bus', status: 'Delete' }
  //  ];

  //  return this.modelRowData;
  //}

  saveModel(objModel: Model, isEditMode: boolean): any {

    var data = JSON.stringify(objModel);
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/Model/SaveModelAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }
    else {

      return this.http.post("https://localhost:44353/api/Model/UpdateModelAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }

  deleteModelList(objModelDelete: Model) {
    var data = JSON.stringify(objModelDelete);
    return this.http.post("https://localhost:44353/api/Model/DeleteModelAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })

    });
  }
}
