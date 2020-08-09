import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { CompanyService } from '../../services/company.service';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DepartmentService } from '../../services/department.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent implements OnInit {

  private objDepartment: Department;
  private objDepartmentDelete: Department;
  private context; 
  private frameworkComponents;
  private lstCompany;
  private lststatus;
  private gridApi;
  private gridColumnApi;
  private selectedCompany = '';
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private gridDepartment: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku

  constructor(private companyService: CompanyService, private statusService: StatusService, private departmentService: DepartmentService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {

    this.objDepartment = new Department();
    this.objDepartment.departmentName = "";
    this.objDepartment.code = "";
    this.objDepartment.isActive = false;

    //console.log("SSSS", (moment().format("MM/DD/YYYY HH:mm")));
    //console.log("aaaa", (moment().utc().format("MM/DD/YYYY HH:mm")));

    this.companyService.getcompanyList().subscribe(response => {
    
      this.lstCompany = response;
    }, err => {
      //alert('in-Error');
    });

    this.departmentService.getdepartmentGrid().subscribe(response => {
      
      if (response) {
               
        this.gridDepartment = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridDepartment(this.gridDepartment);
        console.log("res", response);
      }
    }, err => {
      //alert('in-Error');

    });

  }

  CreateGridDepartment(gridDepartment: DataGridTable) {

    this.columnDefs = gridDepartment.dataGridColumns;
    this.rowData = gridDepartment.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true,/* cellStyle: { 'background-color': 'green' }*/
    });

    //----------------------------- Add By Nipuna Franciku -----------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Edit',
    //  filed: 'IsTansactions',
    //  cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true, suppressNavigable: true,
    //  cellRendererParams: function (params)
    //  {
    //    if (params.data.IsTansactions == "True")
    //    {
    //      params.data.enableButton = "False";
    //    }
    //  }
    //});
    //------------------------------------------------------------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Status2', filed: 'Status2', width: 80, suppressMenu: true
    //});

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 80, suppressMenu: true
    //});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
    //console.log("qqqq=>", params);
  }

  CompanyChanged(objCompany) {
    //this.objDepartment.companyID = this.selectedCompany;
    this.selectedCompany = objCompany;
  }

  GridEditCellClicked(node) {

    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = true;
    this.show = false;
    this.selectedCompany = node.data.CompanyID;
    this.objDepartment.companyID = node.data.CompanyID;
    this.objDepartment.departmentName = node.data.DepartmentName;
    this.objDepartment.code = node.data.Code;
    this.objDepartment.departmentID = node.data.DepartmentID;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objDepartment.isActive = boolValue;
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

    if (node.data.IsTansactions == "True")
    {
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
    this.objDepartmentDelete = node.data;
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
        this.DeleteDepartment(this.objDepartmentDelete)
      }
    });

  }

  DeleteDepartment(objDepartmentDelete) {
    this.departmentService.deleteDepartmentList(objDepartmentDelete)
      .subscribe(response => {

        alert('deleted');

      }, err => {
        alert('delete error');
      });

  }

  SaveDepartment() {
    if (this.selectedCompany== "" || this.objDepartment.code == "" || this.objDepartment.departmentName == "") {
     // alert('Please fill the mandatory fields');
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }
    this.departmentService.saveDepartment(this.objDepartment, this.isEditMode)
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

          this.gridDepartment = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridDepartment(this.gridDepartment);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });
          
          this.objDepartment.companyID = "";
          this.objDepartment.departmentName = "";
          this.objDepartment.code = "";
          this.objDepartment.isActive = false;
          this.objDepartment.departmentID = "00000000-0000-0000-0000-000000000000";
          this.selectedCompany = "";
          this.isDisable = false; //--- Add By Nipuna Francisku

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
          var result = Response.resultObject;
          this.gridDepartment = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridDepartment(this.gridDepartment);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });
          
          this.objDepartment.companyID = "";
          this.objDepartment.departmentName = "";
          this.objDepartment.code = "";
          this.objDepartment.isActive = false;
          this.objDepartment.departmentID = "00000000-0000-0000-0000-000000000000";
          this.selectedCompany = "";
          this.isEditMode = false;
          this.isDisable = false; //--- Add By Nipuna Francisku


          this.show2 = false;
          this.show = true;
        }
        

      }, err => {
        //alert('Save Unsuccessfull');
      });
       
  }

  reset() {
    this.objDepartment.companyID = "";
    this.objDepartment.departmentName = "";
    this.objDepartment.code = "";
    this.objDepartment.isActive = false;
    this.objDepartment.departmentID = "00000000-0000-0000-0000-000000000000";
    this.selectedCompany = "";
    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
    this.isDisable = false; //--- Add By Nipuna Francisku
  }

}
