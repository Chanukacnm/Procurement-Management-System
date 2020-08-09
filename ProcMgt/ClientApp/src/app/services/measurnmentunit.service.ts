//import { Injectable } from '@angular/core';
//import { Measurementunits } from '../models/measurementunits';
//import { Router } from '@angular/router';
//import { HttpHeaders, HttpClient } from '@angular/common/http';

//@Injectable({
//  providedIn: 'root'
//})
//export class MeasurnmentunitService {
//  MeasurnmetUnitList: Measurementunits[];

//  constructor(private router: Router, private http: HttpClient) { }

//  //getMeasurnmetUnitList() {

//  //  return this.http.get("https://localhost:44353/api/MeasurementUnit/GetAllMeasurementUnits", {
//  //    headers: new HttpHeaders({
//  //      "Content-Type": "application/json"
//  //    })
//  //  });

//  //  //this.MeasurnmetUnitList = [{ measurementUnitID: "1", name: "Meeter", code: "", statusID:"" },
//  //  //  { measurementUnitID: "2", name: "CM", code: "", statusID: ""},
//  //  //  { measurementUnitID: "3", name: "Feet", code: "", statusID: ""},
//  //  //  { measurementUnitID: "4", name: "mm", code: "", statusID: "" },
//  //  //  { measurementUnitID: "5", name: "Float", code: "", statusID: "" }
//  //  //];
//  //  //return this.MeasurnmetUnitList;
//  //}

//  getMeasurementUnitList() {

//    return this.http.get("https://localhost:44353/api/MeasurementUnit/GetAllMeasurementUnit", {
//      headers: new HttpHeaders({
//        "Content-Type": "application/json"
//      })
//    });

//  }

//  //MeasurementUnitsService

//  MeasurnmetUnitcolumnDefs = [];

//  getmeasurnmetUnitcolumnDefs() {
//    this.MeasurnmetUnitcolumnDefs = [
//      { headerName: 'Measurement Name', field: 'MeasurementName', width: 130, suppressMenu: true },
//      { headerName: 'Code', field: 'code', width: 70, suppressMenu: true },
//      { headerName: 'Status', field: 'status', width: 70, suppressMenu: true },

//      {
//        headerName: 'Edit',
//        cellRenderer: "buttonRenderer", width: 70, suppressMenu: true
//      },
//      {
//        headerName: 'Delete',
//        cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
//      }
//    ];

//    return this.MeasurnmetUnitcolumnDefs;
//  }

//  MeasurnmetUnitRowData = [];

//  getmeasurnmetUnitRowData() {
//    this.MeasurnmetUnitRowData = [
//      { MeasurementName: "Centimeters", code: "cm", status: "A" },
//      { MeasurementName: "Inches", code: "in", status: "A" },
//      { MeasurementName: "Feet", code: "ft", status: "A" }
//    ];

//    return this.MeasurnmetUnitRowData;
//  }

//  saveMeasurnmetUnit(objMU: Measurementunits): any {

//    var data = JSON.stringify(objMU);

//    return this.http.post("https://localhost:44353/api/MeasurementUnit/SaveMeasurementUnitsAsync", data, {
//      headers: new HttpHeaders({
//        "Content-Type": "application/json"
//      })
//    })

//  }

//}
