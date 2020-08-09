import { Component, OnInit } from '@angular/core';
//import { PurchaseorderService } from '../../services/purchaseorder.service';
//import { Poheader } from '../../models/poheader'; 
import { PoreportdataService } from '../../services/poreportdata.service';
import { Poheader } from '../../models/poheader';
import { PurchaseorderService } from '../../services/purchaseorder.service';

@Component({
  selector: 'app-poreport',
  templateUrl: './poreport.component.html',
  styleUrls: ['./poreport.component.scss']
})
export class PoreportComponent implements OnInit {

  dataObject: any;
  private objPoheader2: Poheader;

  constructor( private purchaseorderService: PurchaseorderService,) { }


  ngOnInit() {

    debugger;
    this.objPoheader2 = new Poheader();
    // this.dataObject= JSON.parse(localStorage.getItem('dataSource'));/// new
    //this.dataService.currentObject.subscribe(dataObject => {
    //  console.log(dataObject);
    //  this.dataObject = dataObject;

      
    //  //this.dataObject = JSON.parse(localStorage.getItem('PoReport'));
   
    //  debugger;

    //  console.log('rajja', this.dataObject);
    //  // alert(this.dataObject);
    //});

    var objPoHeader = JSON.parse(localStorage.getItem("PoReport"));

    console.log('qqqq=>', objPoHeader);
    this.objPoheader2 = objPoHeader;
    debugger;
    this.purchaseorderService.getPoDataList(this.objPoheader2)
      .subscribe(Response => {
        alert("aaa");
        debugger;
        console.log("aaaa=>", Response);

      }, err => {
        alert("bbb");
        console.log("cccc=>", err);
      });

  }
}




  


