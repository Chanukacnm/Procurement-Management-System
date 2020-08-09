import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poheader } from '../models/poheader';
import { DataGridTable } from '../models/datagridtable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PoreportdataService {

  private objectSource = new BehaviorSubject('default object');
  currentObject = this.objectSource.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  changeObject(dataObject: any) {
    console.log('===========================================');
    console.log(dataObject);
    this.objectSource.next(dataObject);
  }

 

}
