import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Changepassword } from '../models/changepassword';
import { Designationbusinessunit } from '../models/designationbusinessunit';
import { Businessunittype } from '../models/businessunittype';

@Injectable({
  providedIn: 'root'
})
export class UseraccountService
{
  
  constructor(private http: HttpClient) { }  

  getUserAccountList() {
    return this.http.get("https://localhost:44353/api/User/GetAllUser", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getDesignationLevel(objbusinessUnitType: Businessunittype): any {
    var data = JSON.stringify(objbusinessUnitType);
    return this.http.post("https://localhost:44353/api/BusinessUnitType/GetAllDesignationLevel/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getBusinessUnits(objUserAccount: User): any {
    var data = JSON.stringify(objUserAccount);
    return this.http.post("https://localhost:44353/api/BusinessUnits/GetAllBusinessUnits/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getUserAccountGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/User/GetUserGridAsync';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getApprovalUserGrid(objDesignationBusinessUnit: Designationbusinessunit): Observable<DataGridTable> {
    var data = JSON.stringify(objDesignationBusinessUnit);
    return this.http.post<DataGridTable>("https://localhost:44353/api/User/GetApprovalUserGridAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  changePW(objchangePw: Changepassword): any {

    var data = JSON.stringify(objchangePw);
    console.log("bbbc=>", objchangePw);
    return this.http.post("https://localhost:44353/api/User/ChangePWAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  SaveUserAccount(objUserAccount: User, isEditMode: boolean): any {
    var data = JSON.stringify(objUserAccount);

    if (!isEditMode) {
      return this.http.post("https://localhost:44353/api/User/SaveUserAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })

      });
    }
    else {
      return this.http.post("https://localhost:44353/api/User/UpdateUserAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }

  deleteUserAccount(objDelUserAccount: User) {
    var data = JSON.stringify(objDelUserAccount);

    return this.http.post("https://localhost:44353/api/User/DeleteUserAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

}
