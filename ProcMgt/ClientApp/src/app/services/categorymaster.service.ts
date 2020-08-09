import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Categorymaster } from '../models/categorymaster';

@Injectable({
  providedIn: 'root'
})
export class CategorymasterService {
  

  constructor(private http: HttpClient) { }



  getcategoryMasterList() {
    return this.http.get("https://localhost:44353/api/CategoryMaster/GetAllCategoryMaster", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })


    });
  }


  getcategoryMasterById(){

    return this.http.get("https://localhost:44353/api/CategoryMaster/GetCategoryMasterByID/{id}", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

   
  getcategoryMasterGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/CategoryMaster/GetCategoryGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });


  }

  saveCategoryMaster(objCategoryMaster: Categorymaster, isEditMode: boolean): any {

    var data = JSON.stringify(objCategoryMaster);

    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/CategoryMaster/SaveCategoryMasterAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    else {
      return this.http.post("https://localhost:44353/api/CategoryMaster/UpdateCategoryMasterAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    
  }

  deleteCategoryMaster(objDelCategory: Categorymaster) {
    
    var data = JSON.stringify(objDelCategory);

    return this.http.post("https://localhost:44353/api/CategoryMaster/DeleteCategoryMasterAsync/{id}",data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  



  



  
}
