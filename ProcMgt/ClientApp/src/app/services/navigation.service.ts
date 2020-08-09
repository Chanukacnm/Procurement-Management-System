import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) { }

  getNavigationList() {

    //return this.http.get("https://localhost:44353/api/Company/GetAllCompany", {
    //  headers: new HttpHeaders({
    //    "Content-Type": "application/json"
    //  })
    //});

  }
}
