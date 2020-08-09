import { Injectable } from '@angular/core';
import { Menu} from '../models/menu';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenuList() {
    return this.http.get("https://localhost:44353/api/Menu/GetAllMenuAsync", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
