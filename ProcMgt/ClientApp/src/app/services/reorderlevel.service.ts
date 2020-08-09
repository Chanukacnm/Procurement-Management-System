import { Injectable } from '@angular/core';
import { Reorderlevel } from '../models/reorderlevel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReorderlevelService {

  

  constructor(private router: Router, private http: HttpClient) { }

  getReOrderLevelList() {
   
    return this.http.get("https://localhost:44353/api/ReOrderLevel/GetAllReOrderLevel", {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }
    


    
  }

