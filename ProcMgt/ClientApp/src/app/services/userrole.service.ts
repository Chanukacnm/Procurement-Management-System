import { Injectable } from '@angular/core';
import { Userrole } from '../models/userrole';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  userRoleList: Userrole[];

  constructor(private http: HttpClient) { }

  getuserRoleList() {
    return this.http.get("https://localhost:44353/api/UserRole/GetAllUserRole", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getUserRoleGrid(): Observable<DataGridTable> {

    const url = 'https://localhost:44353/api/UserRole/GetUserRoleGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  saveUserRole(objUserRole: Userrole, isEditMode: boolean): any {

    var data = JSON.stringify(objUserRole);
    if (!isEditMode) {
      return this.http.post("https://localhost:44353/api/UserRole/SaveUserRoleAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })

    }
    else {

      return this.http.post("https://localhost:44353/api/UserRole/UpdateUserRoleAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    }

    
  }

  deleteuserrole(objUserRole: Userrole) {
    var data = JSON.stringify(objUserRole);
    return this.http.post("https://localhost:44353/api/UserRole/DeleteUserRoleAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  

}
