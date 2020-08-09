import { Component, OnInit, Inject } from '@angular/core';
import { QuotationapprovalService } from '../../services/quotationapproval.service';
import { ActionbuttonRenderer } from '../renderer/button-renderer/actionbutton-renderer.component';
import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionpopupComponent } from '../actionpopup/actionpopup.component';
import { ApprovalscreenrequestviewComponent } from '../approvalscreenrequestview/approvalscreenrequestview.component';
import { DataGridTable } from '../../models/datagridtable';
import { Quotationapproval } from '../../models/quotationapproval';
import { Quotationrequestdetails } from '../../models/quotationrequestdetails';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-quotationapproval',
  templateUrl: './quotationapproval.component.html',
  styleUrls: ['./quotationapproval.component.scss']
})
export class QuotationapprovalComponent implements OnInit {
  private objQuotationApproval: Quotationapproval;
  private objQuotationDetails: Quotationrequestdetails;
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  private context;
  private frameworkComponents;
  private gridQuotationApproval: DataGridTable;
  private isEditMode = false;


  private quantity;

  

  constructor(public dialog: MatDialog, private quotationApprovalService: QuotationapprovalService, public datepipe: DatePipe, public dialogRef: MatDialogRef<ApprovalscreenrequestviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.context = { componentParent: this };
    this.frameworkComponents = {
      actionbuttonRenderer: ActionbuttonRenderer,
      moredetailsbuttonRenderer: MoredetailsbuttonRenderer
    }

  }

  ngOnInit() {
    this.objQuotationApproval = new Quotationapproval();
    this.objQuotationApproval.quotationRequestDetails = [];
    this.objQuotationApproval.quotationNumber ="";
    this.objQuotationApproval.quotationRequestedDate ="";
    this.objQuotationApproval.requiredDate ="";
    this.objQuotationApproval.quotationRequestStatusID;
    this.objQuotationApproval.approvalComment = "";
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objQuotationApproval.userID = UserDet.userId;
    this.objQuotationApproval.quotationRequestDetails.push(this.objQuotationDetails);
  

    this.quotationApprovalService.getquotationapprovalList().subscribe(response => {

      if (response) {

        this.gridQuotationApproval = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationApproval(this.gridQuotationApproval);

      }
    }, err => {
      //alert('in-Error');
    });


  }

  CreateGridQuotationApproval(gridQuotationApproval: DataGridTable) {


    this.columnDefs = gridQuotationApproval.dataGridColumns;
    this.rowData = gridQuotationApproval.dataGridRows;

    //this.columnDefs.push({
    //  headerName: 'More Details',
    //  cellRenderer: "moredetailsbuttonRenderer", width: 130, suppressMenu: true
    //});

    this.columnDefs.push({
      headerName: 'Action',
      cellRenderer: "actionbuttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });

   
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit(100);
  }


  GridActionCellClicked(node) {
    console.log("node.data", node.data);
    this.objQuotationApproval = node.data;
    const dialogRef = this.dialog.open(ActionpopupComponent, {
      data: this.data.approvalComment = this.objQuotationApproval.approvalComment  ,
      width: '600px',
      height: '345px',
      position: {
        top: '',
        bottom: '',
        left: '460px',
        right: ''
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case true:
          console.log('Yes clicked');
          this.objQuotationApproval.approvalComment = this.data.approvalComment;
          this.objQuotationApproval.quotationRequestStatusID = 2;

          this.SaveQuotationApproval(this.objQuotationApproval);

          Swal.fire({
            icon: 'success',
            text: 'Request has been Successfully Approved',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });

          break;

        case false:
          console.log("Reject Click");
          this.objQuotationApproval.approvalComment = this.data.approvalComment;
          this.objQuotationApproval.quotationRequestStatusID = 4;

          this.SaveQuotationApproval(this.objQuotationApproval);

          Swal.fire({
            icon: 'success',
            text: 'Request has been Successfully Rejected',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });

          break;

        default:
          Swal.fire({
            icon: 'error',
            text: 'Action has been Closed! ',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });
          console.log("Cancel");

      }
      //if (result == true) {
      //  console.log('Yes clicked');
      //  this.objQuotationApproval.approvalComment = this.data.approvalComment;
      //  this.objQuotationApproval.quotationRequestStatusID = 2;
       
      //  this.SaveQuotationApproval(this.objQuotationApproval)

      //}
      //else {
      //  this.objQuotationApproval.approvalComment = this.data.approvalComment;
      //  this.objQuotationApproval.quotationRequestStatusID = 4;
       
      //  this.SaveQuotationApproval(this.objQuotationApproval)

      //}
    });
   
  }


  GridMoreDetailsCellClicked(node) {
    console.log(node.data);
    this.objQuotationApproval = node.data;
    const dialogRef = this.dialog.open(ApprovalscreenrequestviewComponent, {
      data: this.objQuotationApproval,
      width: '1100px',
      height: '550px',
      position: {
        top: '80px',
        bottom: '',
        left: '220px',
        right: '30px'

      },

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });


  }


  SaveQuotationApproval(objQuotationApproval) {
   
    console.log("bbb", this.objQuotationApproval);
    
    this.isEditMode = true;
    //this.objQuotationApproval.approvedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.quotationApprovalService.savequotationApproval(this.objQuotationApproval, this.isEditMode)
      .subscribe(Response => {
        if (!this.isEditMode) {

          this.quotationApprovalService.getquotationapprovalList().subscribe(response => {

            if (response) {

              this.gridQuotationApproval = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
              this.CreateGridQuotationApproval(this.gridQuotationApproval);

            }
          }, err => {
            //alert('in-Error');
          });

          //Swal.fire({

          //  text: 'The record has been saved successfully',

          //  showCloseButton: true,
          //  showConfirmButton: true,
          //  confirmButtonColor: '#61CD23'

          //});
          
        }
        else {


          this.quotationApprovalService.getquotationapprovalList().subscribe(response => {

            if (response) {

              this.gridQuotationApproval = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
              this.CreateGridQuotationApproval(this.gridQuotationApproval);

            }
          }, err => {
            //alert('in-Error');
          });

          //Swal.fire({

          //  text: 'Records have been updated successfully',
          //  showCloseButton: true,
          //  showConfirmButton: true,
          //  confirmButtonColor: '#61CD23'

          //});
          
        }  

      }, err => {
        
      });

  }
}
