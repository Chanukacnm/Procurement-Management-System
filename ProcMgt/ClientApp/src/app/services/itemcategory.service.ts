import { Injectable } from '@angular/core';
import { Itemcategory } from '../models/itemcategory';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ItemcategoryService {

  

  constructor(private router: Router, private http: HttpClient) { }

  getItemCategroyList() {

    return this.http.get("https://localhost:44353/api/ItemCategory/GetAllItemCategory", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
   

  
  }
}
