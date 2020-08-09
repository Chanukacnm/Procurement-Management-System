import { Injectable } from '@angular/core';
import { Arnentry } from '../models/arnentry';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Arnheader } from '../models/arnheader';

@Injectable({
  providedIn: 'root'
})
export class ArnentryService {

  constructor(private http: HttpClient) { }

  getpoListGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/ArnEntry/GetPOGrListGridAsync';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }


  getArnHeaderList(objARNHeader: Arnheader): any {

    var data = JSON.stringify(objARNHeader);

    return this.http.post("https://localhost:44353/api/ArnEntry/GetAllArnheader", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }




  getARNdetailListGrid(objARNHeader): Observable<DataGridTable> {
    var data = JSON.stringify(objARNHeader);

    return this.http.post<DataGridTable>("https://localhost:44353/api/ArnEntry/GetArndetailGrid", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  saveArnEntry(objARNHeader: Arnheader, isEditMode: boolean): any {
    

    var data = JSON.stringify(objARNHeader);
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/ArnEntry/SaveArnheader", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }
    else {

      return this.http.post("https://localhost:44353/api/ArnEntry/UpdateArnheaderAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }
}
