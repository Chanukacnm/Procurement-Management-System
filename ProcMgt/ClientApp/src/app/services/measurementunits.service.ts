import { Injectable } from '@angular/core';
import { Measurementunits } from '../models/measurementunits';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataGridTable } from '../models/datagridtable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitsService {
  
  constructor(private router: Router, private http: HttpClient) { }

  getMeasurementUnitsList() {

    return this.http.get("https://localhost:44353/api/MeasurementUnit/GetAllMeasurementUnits", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  getmeasurementUnitstGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/MeasurementUnit/GetMeasurementUnitGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  
  saveMeasurementUnit(objMU: Measurementunits, isEditMode: boolean): any {

    var data = JSON.stringify(objMU);
    if (!isEditMode) {
      return this.http.post("https://localhost:44353/api/MeasurementUnit/SaveMeasurementUnitsAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    }

    else {

      return this.http.post("https://localhost:44353/api/MeasurementUnit/UpdateMeasurementUnitsAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    }

  }

  deleteMeasurementunits(objMU: Measurementunits) {
    
    var data = JSON.stringify(objMU);

    return this.http.post("https://localhost:44353/api/MeasurementUnit/DeleteMeasurementunitsAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })

  }
}
