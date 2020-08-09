import { Injectable } from '@angular/core';
import { Tax } from '../models/tax';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataGridTable } from '../models/datagridtable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  taxList: Tax[];
  taxRowDataList = [];
  taxcolumnDefs = [];

  constructor(private router: Router, private http: HttpClient) { }

  gettaxGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Tax/GetTaxGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"

      })
    });
  
  }

  getTaxList() {

    return this.http.get("https://localhost:44353/api/Tax/GetAllTax", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  //getTaxList() {

  //  this.taxList = [{ taxCode: "001", taxName: "Tax1", percentage: "10", taxID:"001" },
  //    { taxCode: "002", taxName: "NTB", percentage: "10", taxID: "002" },
  //    { taxCode: "003", taxName: "Tax2", percentage: "10", taxID: "003"}
  //  ];

  //  return this.taxList;
  //}

  //getTaxRowDataList() {

  //  this.taxRowDataList = [
  //    { Taxcode: 'TAX01', Taxname: 'NBT', Percentage: '10' },
  //    { Taxcode: 'TAX02', Taxname: 'TAX', Percentage: '8' },
  //    { Taxcode: 'TAX03', Taxname: 'TAX_1', Percentage: '20' }
  //  ];

  //  return this.taxRowDataList;
  //}

  //getTaxColumnDefst() {

  //  this.taxcolumnDefs = [
  //    { headerName: 'Tax Code', field: 'Taxcode', width: 120, suppressMenu: true },
  //    { headerName: 'Tax Name', field: 'Taxname', width: 120, suppressMenu: true },
  //    { headerName: 'Percentage', field: 'Percentage', width: 120, suppressMenu: true },
  //    {
  //      headerName: 'Edit',
  //      cellRenderer: "buttonRenderer", width: 70, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Delete',
  //      cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
  //    }
  //  ];

  //  return this.taxcolumnDefs;
  //}


  saveTax(objTax: Tax, isEditMode: boolean): any {

    var data = JSON.stringify(objTax);

    if (!isEditMode) {
      return this.http.post("https://localhost:44353/api/Tax/SaveTaxAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }

    else {
      
      return this.http.post("https://localhost:44353/api/Tax/UpdateTaxAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }

  deleteTax(objTaxDelete: Tax) {
    
    var data = JSON.stringify(objTaxDelete);

    return this.http.post("https://localhost:44353/api/Tax/DeleteTaxAsync/{id}", data,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })

  }

}
