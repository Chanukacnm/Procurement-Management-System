import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Issueheader } from '../models/issueheader';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  getIssueGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/Issue/GetIssueGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });


  }

  saveIssue(objIssueheader: Issueheader): any {

    var data = JSON.stringify(objIssueheader);
    return this.http.post("https://localhost:44353/api/Issue/SaveIssueAsync", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }


}
