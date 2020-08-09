import { Injectable } from '@angular/core';
import { Userroleaccers } from '../models/userroleaccers';
import { Rolemenualter } from '../models/rolemenualter';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Rolemenu } from '../models/rolemenu';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';

@Injectable({
  providedIn: 'root'
})
export class UserroleaccersService {

  constructor(private router: Router, private http: HttpClient) { }

  //saveUserroleaccers(objRoleMenu: Rolemenualter): any {

  //  var data = JSON.stringify(objRoleMenu);
  //  debugger;

  //  return this.http.post("https://localhost:44353/api/RoleMenu/SaveRoleMenuAsync", data,{
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  });

  //}

  deleteandsave(objRoleMenu: Rolemenualter): any {

    var data = JSON.stringify(objRoleMenu);

    return this.http.post("https://localhost:44353/api/RoleMenu/DeleteAndSave" , data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  getmenuByID(id: string): any {

    console.log(id);

    var data = JSON.stringify({ id: id });

    return this.http.post("https://localhost:44353/api/RoleMenu/GetMenuList/" + id, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

}
