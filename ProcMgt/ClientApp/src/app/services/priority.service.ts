import { Injectable } from '@angular/core';
import { Priority } from '../models/priority';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  priorityList: Priority[];

  constructor(private router: Router, private http: HttpClient) { }

  getpriorityList() {
    return this.http.get("https://localhost:44353/api/Priority/GetAllPriority", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}

