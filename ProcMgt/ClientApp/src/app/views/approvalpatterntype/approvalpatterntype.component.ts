import { Component, OnInit } from '@angular/core';
import { Approvalpatterntype } from '../../models/approvalpatterntype';
import { ApprovalpatterntypeService } from '../../services/approvalpatterntype.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approvalpatterntype',
  templateUrl: './approvalpatterntype.component.html',
  styleUrls: ['./approvalpatterntype.component.scss']
})
export class ApprovalpatterntypeComponent implements OnInit {

  private objApprovalPatternType: Approvalpatterntype;
  private objDelApprovalPatternType: Approvalpatterntype;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private gridApprovalPatternType: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;


  constructor( private approvalPatternTypeService: ApprovalpatterntypeService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {

    this.objApprovalPatternType = new Approvalpatterntype();
    this.objApprovalPatternType.patternName = "";
    this.objApprovalPatternType.code = "";
    this.objApprovalPatternType.isActive = false;

    this.approvalPatternTypeService.getApprovalPatternTypeGrid().subscribe(response => {

      if (response) {
        this.gridApprovalPatternType = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit,  response.dataGridColumns, response.dataGridRows);
        this.CreateGridApprovalPatternType(this.gridApprovalPatternType);
      }
    }, err => {
      //alert('in-Error');
    });

  }

  CreateGridApprovalPatternType(gridCategoryMaster: DataGridTable) {

    this.columnDefs = this.gridApprovalPatternType.dataGridColumns;
    this.rowData = this.gridApprovalPatternType.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 90, suppressMenu: true, lockPosition: true,
    });

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
    //});

  }

  SaveApprovalPatternType() {
    if (this.objApprovalPatternType.code == "" || this.objApprovalPatternType.patternName == "") {

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.approvalPatternTypeService.saveApprovalPatternType(this.objApprovalPatternType, this.isEditMode)
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

          this.gridApprovalPatternType = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridApprovalPatternType(this.gridApprovalPatternType);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objApprovalPatternType.approvalPatternTypeID = "00000000-0000-0000-0000-000000000000";
          this.objApprovalPatternType.code = "";
          this.objApprovalPatternType.patternName = "";
          this.objApprovalPatternType.isActive = false;

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
          

          this.gridApprovalPatternType = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridApprovalPatternType(this.gridApprovalPatternType);


          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });


          this.objApprovalPatternType.approvalPatternTypeID = "00000000-0000-0000-0000-000000000000";
          this.objApprovalPatternType.code = "";
          this.objApprovalPatternType.patternName = "";
          this.objApprovalPatternType.isActive = false;

          this.isEditMode = false;

          this.show2 = false;
          this.show = true;
        }
        

      }, err => {
        //alert('Saved Unsuccessfull');
      });

  }

  

  reset() {
    this.objApprovalPatternType.approvalPatternTypeID = "00000000-0000-0000-0000-000000000000";
    this.objApprovalPatternType.code = "";
    this.objApprovalPatternType.patternName = "";
    this.objApprovalPatternType.isActive = false;

    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }


  GridEditCellClicked(node, Header) {
    this.isEditMode = true;
    this.show2 = true;
    this.show = false;
    this.objApprovalPatternType.approvalPatternTypeID = node.data.ApprovalPatternTypeID;
    this.objApprovalPatternType.code = node.data.Code;
    this.objApprovalPatternType.patternName = node.data.PatternName;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objApprovalPatternType.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }
    //this.objApprovalPatternType.isActive = node.data.IsActive;
  }

  GridDeleteCellClicked(node, Header) {

    
    this.objDelApprovalPatternType = new Approvalpatterntype();
    this.objDelApprovalPatternType = node.data;
    console.log('bbc=>', this.objDelApprovalPatternType);


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
        console.log('bb=>', node.data);
        console.log('Deleted!...');
        this.DeleteApprovalPatterType(this.objDelApprovalPatternType);
      }
    })
  }

  DeleteApprovalPatterType(objDelApprovalPatternType) {
    this.approvalPatternTypeService.deleteApprovalPatternType(objDelApprovalPatternType)
      .subscribe(Response => {

        alert('Deleted');
      }, err => {
        alert('Delete Failed');
      });
  }
}
