import { Component, OnInit, Inject } from '@angular/core';
import { ApprovalscreenService } from '../../services/approvalscreen.service';
import { ActionbuttonRenderer } from '../renderer/button-renderer/actionbutton-renderer.component';
import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionpopupComponent } from '../actionpopup/actionpopup.component';
import { ApprovalscreenrequestviewComponent } from '../approvalscreenrequestview/approvalscreenrequestview.component';
import { DataGridTable } from '../../models/datagridtable';
import { Approvalscreen } from '../../models/approvalscreen';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
//import swal from 'sweetalert2';


@Component({ 
  selector: 'app-approvalscreen',
  templateUrl: './approvalscreen.component.html',
  styleUrls: ['./approvalscreen.component.scss']

})
export class ApprovalscreenComponent implements OnInit {
  private objApprovalScreen: Approvalscreen;
  private objuser: User;
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  private context;
  private frameworkComponents;
  private gridApprovalScreen: DataGridTable;
  private isEditMode = false;

  constructor(public dialog: MatDialog, private approvalScreenService: ApprovalscreenService, public datepipe: DatePipe, public dialogRef: MatDialogRef<ApprovalscreenrequestviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.context = { componentParent: this };
    this.frameworkComponents = {
      actionbuttonRenderer: ActionbuttonRenderer,
      moredetailsbuttonRenderer: MoredetailsbuttonRenderer
    }

  }
   
  ngOnInit() {

    this.objApprovalScreen = new Approvalscreen();
    this.objuser = new User();
    this.objApprovalScreen.requestTitle = "";
    this.objApprovalScreen.requiredDate = "";
    this.objApprovalScreen.requestedDateTime = "";
    this.objApprovalScreen.assetCode = " ";
    this.objApprovalScreen.noOfUnits;
    this.objApprovalScreen.remark = "";
    this.objApprovalScreen.isReplaceble = true;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    //console.log("UserDet =>" , UserDet)
    this.objApprovalScreen.departmentID = UserDet.departmentId  ; 
    //this.objApprovalScreen.requestedUserID = UserDet.userId;
    this.objApprovalScreen.approvedUserID = UserDet.userId;

    this.objuser.userID = UserDet.userId;
    this.objuser.departmentID = UserDet.departmentId; 
    this.objuser.userRoleID = UserDet.userRoleId;
    

    console.log("UserDet =>", this.objuser);

    this.approvalScreenService.getapprovalScreenList(this.objuser).subscribe(response => {

      if (response) {

        this.gridApprovalScreen = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridApprovalScreen(this.gridApprovalScreen);

      }
    }, err => {
      //alert('in-Error');
    });

  }

  CreateGridApprovalScreen(gridApprovalScreen: DataGridTable) {


    this.columnDefs = gridApprovalScreen.dataGridColumns;
    this.rowData = gridApprovalScreen.dataGridRows;

    this.columnDefs.push({
      headerName: 'Action',
      cellRenderer: "actionbuttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });

    this.columnDefs.push({
      headerName: 'More Details',
      cellRenderer: "moredetailsbuttonRenderer", width: 130, suppressMenu: true
    });

    

  
  }

  //columnDefs = this.approvalScreenService.getapprovalScreencolumnDefs();
  //rowData = this.approvalScreenService.getapprovalScreenRowData();

  //columnDefs = [
  //  { headerName: 'Request Department', field: 'department', width: 180, suppressMenu: true },
  //  { headerName: 'Request Title', field: 'reqTitle', width: 180, suppressMenu: true },
  //  { headerName: 'Request Date', field: 'reqDate', width: 150, suppressMenu: true},
  //  { headerName: 'Priority Level', field: 'level', width: 150, suppressMenu: true, cellStyle: { color: 'red'/*, 'background-color': 'green'*/ }},
  //  { headerName: 'Request User', field: 'user', width: 150, suppressMenu: true},
  //  {
  //    headerName: 'Action',
  //    cellRenderer: "actionbuttonRenderer", width: 100, suppressMenu: true

  //  },
  //  {
  //    headerName: 'More Details',
  //    cellRenderer: "moredetailsbuttonRenderer", width: 140, suppressMenu: true
  //  }


  //];

  //rowData = [
  //  { department: 'Finance Department', reqTitle: 'Audit Report', reqDate: '25/7/2019', level: 'Division Approval', user: 'User 1' },
  //  { department: 'HR Department', reqTitle: 'Salary Report', reqDate: '25/7/2019', level: 'Manager Approval', user: 'User 2' },
  //  { department: 'IT Department', reqTitle: 'Leave Report', reqDate: '25/7/2019', level: 'Director Approval', user: 'User 3' },
  //  { department: 'IT Department', reqTitle: 'Salary Report', reqDate: '25/7/2019', level: 'Manager Approval', user: 'User 4' },
  //  { department: 'HR Department', reqTitle: 'Leave Report', reqDate: '25/7/2019', level: 'Director Approval', user: 'User 5' },
  //  { department: 'IT Department', reqTitle: 'Trip Budget', reqDate: '25/7/2019', level: 'Manager Approval', user: 'User 6' }
  //];

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit(100);
  }



  GridActionCellClicked(node) {
    this.objApprovalScreen = node.data;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objApprovalScreen.approvedUserID = UserDet.userId;
    this.objApprovalScreen.receivedQty = node.data.NoOfUnits;

    console.log("ccc=>" ,this.objApprovalScreen);
    const dialogRef = this.dialog.open(ActionpopupComponent, {
        data: this.objApprovalScreen.approvalComment = this.data.approvalComment,
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
          this.objApprovalScreen.approvalComment = this.data.approvalComment;
          this.objApprovalScreen.isApproved = true;
          this.objApprovalScreen.isRejected = false;
          this.SaveApprovalScreen(this.objApprovalScreen);
          break;

        case false:
          console.log("Reject Click");
          this.objApprovalScreen.approvalComment = this.data.approvalComment;
          this.objApprovalScreen.isRejected = true;
          this.objApprovalScreen.isApproved = false;
          this.SaveApprovalScreen(this.objApprovalScreen);
          break;

        default:
          console.log("Cancel");


      }
      //if (result== true) {
      //  console.log('Yes clicked');
      //  this.objApprovalScreen.approvalComment = this.data.approvalComment;
      //  this.objApprovalScreen.isApproved = true;
      //  this.objApprovalScreen.isRejected = false;
      //  this.SaveApprovalScreen(this.objApprovalScreen)
       
      //}
      //else {
      //  this.objApprovalScreen.approvalComment = this.data.approvalComment;
      //  this.objApprovalScreen.isRejected = true;
      //  this.objApprovalScreen.isApproved = false;
      //  this.SaveApprovalScreen(this.objApprovalScreen)
        
      //}
    });
  }

  GridMoreDetailsCellClicked(node) {
    console.log(node.data);
    this.objApprovalScreen = node.data;
  const dialogRef = this.dialog.open(ApprovalscreenrequestviewComponent, {
      data: this.objApprovalScreen,
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

  SaveApprovalScreen(objApprovalScreen) {
    console.log("aaa", this.objApprovalScreen);
    this.isEditMode = true;
    this.objApprovalScreen.approvedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.approvalScreenService.saveApprovalScreen(this.objApprovalScreen, this.isEditMode)
      .subscribe(Response => {

        console.log("qqqq=>", Response);

            var result = Response.resultObject;
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

        this.approvalScreenService.getapprovalScreenList(this.objuser).subscribe(response => {

          if (response) {
            
            //var result = response.resultObject;
            //var result2 = response.message;
            //var result3 = response.status;

            //if (result3 == false) {
            //  Swal.fire({

            //    icon: 'error',
            //    text: result2,

            //    showCloseButton: true,
            //    showConfirmButton: true,
            //    confirmButtonColor: '#61CD23',

            //  });
            //  return false;
            //}


            this.gridApprovalScreen = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
            this.CreateGridApprovalScreen(this.gridApprovalScreen);

            Swal.fire({

              icon: 'success',
              text: 'The record has been saved successfully',

              showCloseButton: true,
              showConfirmButton: true,
              confirmButtonColor: '#61CD23'

            });

            //alert('The record has been saved successfully');
          }
        }, err => {
          //alert('in-Error');
        });


        //swal({
        //  title: "Are you sure?",
        //  text: "Once deleted, you will not be able to recover this imaginary file!",
        //  type: 'warning',
        //  showConfirmButton: true,
        //  showCancelButton: true
        //})
       
        

      }, err => {
        //alert('Save Unsuccessful');
      });

  }


}
