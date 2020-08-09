import { Component, OnInit } from '@angular/core';
import { Tax } from '../../models/tax';
import { TaxService } from '../../services/tax.service';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  private objTax: Tax;
  private lststatus;

  private gridApi;
  private gridColumnApi;

  private context;
  private frameworkComponents;

  private columnDefs;
  private rowData;
  private gridTax: DataGridTable;
   
  private objTaxDelete: Tax;
  private isEditMode = false;
  public show2: boolean = false;
  public show: boolean = true;

  constructor(private taxService: TaxService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objTax = new Tax();
    this.objTax.taxName = "";
    this.objTax.taxCode = "";
    this.objTax.percentage;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objTax.userID = UserDet.userId;

    this.taxService.gettaxGrid().subscribe(response => {

      if (response) {

        this.gridTax = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridTax(this.gridTax);

      }


    }, err => {
      //alert('in-Error');
    });

  }

  CreateGridTax(gridTax: DataGridTable) {


    this.columnDefs = gridTax.dataGridColumns;
    this.rowData = gridTax.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 90, suppressMenu: true, lockPosition: true,

    });

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


  GridEditCellClicked(node) {
    this.isEditMode = true;
    this.show2 = true;
    this.show = false;
    console.log(node.data);
    this.objTax.taxCode = node.data.TaxCode;
    this.objTax.taxName = node.data.TaxName;
    this.objTax.taxID = node.data.TaxID;
    this.objTax.percentage = node.data.Percentage;
  }

  GridDeleteCellClicked(node, Header) {
    this.objTaxDelete = new Tax();
    this.objTaxDelete = node.data;
    

    const dialogRef = this.dialog.open(DeletepopupComponent, {
      width: '500px',
      height: '265px ',
      position: {
        top: '',
        bottom: '',
        left: '460px',
        right: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('bb=>', node.data);
        console.log('Deleted!...');
        this.DeleteTax(this.objTaxDelete);
      }
    });
  }

  SaveTax() {
    if (this.objTax.taxName == "" || this.objTax.taxCode == "" || this.objTax.percentage ==0) {
     
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.taxService.saveTax(this.objTax, this.isEditMode)
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
          var result = Response.resultObject;

          this.gridTax = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridTax(this.gridTax);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objTax.taxID = "00000000-0000-0000-0000-000000000000";
          this.objTax.taxCode = "";
          this.objTax.taxName = "";
          this.objTax.percentage = 0;
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

          //alert('Records have been updated successfully');
          //var result = Response.resultObject;

          this.gridTax = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridTax(this.gridTax);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });

          this.objTax.taxID = "00000000-0000-0000-0000-000000000000";
          this.objTax.taxCode = "";
          this.objTax.taxName = "";
          this.objTax.percentage = 0;

          this.isEditMode = false;

          this.show2 = false;
          this.show = true;
        }
        

      }, err => {
        //alert('Save Unsuccessfull');
      });

  }

  reset() {
    this.objTax.taxID = "00000000-0000-0000-0000-000000000000";
    this.objTax.taxCode = "";
    this.objTax.taxName = "";
    this.objTax.percentage = 0;

    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
  }

  DeleteTax(objTaxDelete) {

    this.taxService.deleteTax(objTaxDelete)
      .subscribe(response => {

        alert('deleted');

      }, err => {
        alert('delete error');
      });

  }
}
