import { Component, OnInit } from '@angular/core';
import { Paymentmethod } from '../../models/paymentmethod';
import { PaymentmethodService } from '../../services/paymentmethod.service';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.scss']
})
export class PaymentmethodComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private context;
  private frameworkComponents;
  private objPM: Paymentmethod;
  private lstStatus;
  private gridPaymentMethod: DataGridTable;
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private objPMDelete: Paymentmethod;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku


  constructor(private statusService: StatusService, private paymentmethodService: PaymentmethodService, public dialog: MatDialog) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objPM = new Paymentmethod();
    this.objPM.paymentMethodName = "";
    this.objPM.paymentMethodCode = "";
    this.objPM.isActive = false;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objPM.userID = UserDet.userId;
    

    this.paymentmethodService.getpaymentMethodGridList().subscribe(response => {

      if (response) {

        this.gridPaymentMethod = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridPaymentMethod(this.gridPaymentMethod);
      }
    }, err => {
      //alert('in-Error');
    });
  }

  CreateGridPaymentMethod(gridPaymentMethod: DataGridTable) {


    this.columnDefs = gridPaymentMethod.dataGridColumns;
    this.rowData = gridPaymentMethod.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 90, suppressMenu: true, lockPosition: true,
    });

    //----------------------------- Add By Nipuna Franciku -----------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Edit',
    //  filed: 'IsTansactions',
    //  cellRenderer: "buttonRenderer", width: 90, suppressMenu: true, lockPosition: true, suppressNavigable: true,
    //  //editable:true,
    //  cellRendererParams: function (params) {
    //    if (params.data.IsTansactions == "True") {
    //      params.data.enableButton = "False";
    //    }
    //  }
    //});
    //------------------------------------------------------------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
    //});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  GridEditCellClicked(node, Header) {

    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = true;
    this.show = false;
    this.objPM.paymentMethodID = node.data.PaymentMethodID;
    this.objPM.paymentMethodCode = node.data.PaymentMethodCode;
    this.objPM.paymentMethodName = node.data.PaymentMethodName;
    //this.objPM.isActive = node.data.IsActive;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objPM.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }
    //-------------- Add By Nipuna Franciku -------------------------

    if (node.data.IsTansactions == "True") {
      this.isDisable = true;
      //Swal.fire({

      //  icon: 'info',
      //  text: 'Not allowed to edit mode..!',

      //  showCloseButton: true,
      //  showConfirmButton: true,
      //  confirmButtonColor: '#61CD23'

      //});
    }
  //------------------------------------------------------------------
  }

  GridDeleteCellClicked(node) {
    this.objPMDelete = node.data;
    const dialogRef = this.dialog.open(DeletepopupComponent, {
      width: '485px',
      height: '268px ',
      position: {
        top: '',
        bottom: '',
        left: '475px',
        right: ''
      }
     
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.DeletePaymentMethod(this.objPMDelete)
      }
    });
  }
    
  DeletePaymentMethod(objPMDelete) {
    this.paymentmethodService.deletepaymentMethodList(objPMDelete)
      .subscribe(response => {

        alert('deleted');

      }, err => {
        alert('delete error');
      });
  }

  SavePaymentMethod() {

    if (this.objPM.paymentMethodCode == "" || this.objPM.paymentMethodName =="") {

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.paymentmethodService.savePaymentMethod(this.objPM, this.isEditMode)
      .subscribe(Response => {
        if (!this.isEditMode) {


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

         
          //alert('The record has been saved successfully');
          //var result = Response.resultObject;

          this.gridPaymentMethod = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridPaymentMethod(this.gridPaymentMethod);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objPM.paymentMethodID = "00000000-0000-0000-0000-000000000000";
          this.objPM.paymentMethodName = "";
          this.objPM.paymentMethodCode = "";
          this.objPM.isActive = false;

          this.isEditMode = false;

          this.show2 = false;
          this.show = true;
          this.isDisable = false; //----- Add By Nipuna Franciku

        }
        else {

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

          this.gridPaymentMethod = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridPaymentMethod(this.gridPaymentMethod);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });


          this.objPM.paymentMethodID = "00000000-0000-0000-0000-000000000000";
          this.objPM.paymentMethodName = "";
          this.objPM.paymentMethodCode = "";
          this.objPM.isActive = false;

          this.isEditMode = false;

          this.show2 = false;
          this.show = true;
          this.isDisable = false; //----- Add By Nipuna Franciku

        }  
      }, err => {
        //alert('Save Unsuccessfull ');
      });
  }

  reset() {
    this.objPM.paymentMethodID = "00000000-0000-0000-0000-000000000000";
    this.objPM.paymentMethodName = "";
    this.objPM.paymentMethodCode = "";
    this.objPM.isActive = false;

    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
  }
}

