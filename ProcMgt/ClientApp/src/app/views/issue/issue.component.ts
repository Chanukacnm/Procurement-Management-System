import { Component, OnInit } from '@angular/core';
import { DataGridTable } from '../../models/datagridtable';
import { IssueService } from '../../services/issue.service';
import { IssueactionbuttonRenderer } from '../renderer/button-renderer/issueactionbutton-renderer.component';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Stock } from '../../models/stock';
import { Issueheader } from '../../models/issueheader';
import { Issuedetails } from '../../models/issuedetails';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  private objIssueheader: Issueheader;
  private objIssueDetails: Issuedetails;
  private objStock: Stock;
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  private context;
  private frameworkComponents;
  private gridissue: DataGridTable;

  constructor(private issueService: IssueService) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      issueactionbuttonRenderer: IssueactionbuttonRenderer
    }
  }

  ngOnInit() {

    this.objIssueheader = new Issueheader();
    this.objIssueDetails = new Issuedetails();
    this.objStock = new Stock();
    this.objIssueheader.issueDetails = [];
    

    this.issueService.getIssueGrid().subscribe(response => {

      if (response) {
        this.gridissue = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridIssue(this.gridissue);
      }

    }, err => {
    });
  }

  CreateGridIssue(gridissue: DataGridTable) {
    this.columnDefs = gridissue.dataGridColumns;
    this.rowData = gridissue.dataGridRows;

    this.columnDefs.push({
      headerName: 'Action',
      cellRenderer: "issueactionbuttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });

  }

  GridIssueActionCellClicked(node) {
    Swal.fire({

      icon: 'question',
      text: "Are you sure you want to issue this?",
      
      //input: 'text',
      //inputAttributes: {
      //  autocapitalize: 'off'
      //},
      //preConfirm: (comment) => {
      //  console.log("bbbb=>", comment);
      //},

      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#61CD23',
      confirmButtonText: 'Yes, Issue this!',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',


    }).then((result) => {
      if (result.value == true) {
        //console.log("qqqq=>", result);
        //console.log("zzzz=>" , node.data);
        this.objIssueheader.itemRequestID = node.data.ItemRequestID;
        this.objIssueheader.issuedDateTime = (moment().format("MM/DD/YYYY HH:mm:ss"));
        var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
        this.objIssueheader.issuedUserID = UserDet.userId;

        //const comment = JSON.stringify(result.value)
        //this.objIssue.comment = comment;
        
        this.objIssueDetails.itemID = node.data.ItemID;
        this.objIssueDetails.qty = node.data.NoOfUnits;
        this.objIssueheader.receivedQty = node.data.ReceivedQty;

        this.objIssueheader.issueDetails.push(this.objIssueDetails);

        console.log("objIssue =>", this.objIssueheader);

        this.objStock.itemID = node.data.ItemID;
        this.objStock.receivedQty = node.data.ReceivedQty;
        console.log("stock", this.objStock);
        console.log("cc", node.data.NoOfUnits);
        console.log("qq", this.objStock.receivedQty);

        //if (node.data.NoOfUnits > this.objStock.receivedQty) {

        //  Swal.fire({

        //    icon: 'error',
        //    text: 'Received Quantity is not enough to issue.!',

        //    showCloseButton: true,
        //    showConfirmButton: true,
        //    confirmButtonColor: '#61CD23'

        //  });

        //  return false;

        //}

        this.issueService.saveIssue(this.objIssueheader)
          .subscribe(Response => {


            var result2 = Response.message;
            var result3 = Response.status;

            if (result3 == false) {
              Swal.fire({

                icon: 'error',
                text: result2,

                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonColor: '#61CD23',

              });
              return false;
            }

             var result = Response.resultObject;
             this.gridissue = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
             this.CreateGridIssue(this.gridissue);
             
             Swal.fire({
               icon: 'success',
               text: 'The record has been saved successfully',
             
               showCloseButton: true,
               showConfirmButton: true,
               confirmButtonColor: '#61CD23',
             
             });

            this.objIssueheader.issueDetails = [];
             
          }, err => {
            Swal.fire({
              icon: 'error',
              text: 'Request has been Not Saved',
            
              showCloseButton: true,
              showConfirmButton: true,
              confirmButtonColor: '#ff4d4d'
            
            });

          });
         
      }
    });
    
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


    //params.api.sizeColumnsToFit();
  }


}
