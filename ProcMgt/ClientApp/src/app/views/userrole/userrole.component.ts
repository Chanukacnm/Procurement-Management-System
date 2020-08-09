import { Component, OnInit } from '@angular/core';
import { Userrole } from '../../models/userrole';
import { CompanyService } from '../../services/company.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { UserroleService } from '../../services/userrole.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.scss']
})

export class UserroleComponent implements OnInit {

  private objUserRole: Userrole;
  private objDelUserRole: Userrole;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private gridUserRole: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku
  

  constructor(private companyService: CompanyService, private userroleService: UserroleService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objUserRole = new Userrole();
    this.objUserRole.userRoleName = "";
    this.objUserRole.code = "";
    this.objUserRole.isActive = false;

    this.userroleService.getUserRoleGrid().subscribe(response => {

      if (response) {
        this.gridUserRole = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit,  response.dataGridColumns, response.dataGridRows);
        this.CreateGridUserRole(this.gridUserRole);
      }
    }, err => {
      //alert('in-Error');
    });
  }

  CreateGridUserRole(gridUserRole: DataGridTable) {

    this.columnDefs = gridUserRole.dataGridColumns;
    this.rowData = gridUserRole.dataGridRows;

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
    //  cellRenderer: "deletebuttonRenderer", width: 90, suppressMenu: true
    //});
  }
  
  SaveUserRole() {

    if (this.objUserRole.code == "" || this.objUserRole.userRoleName == "") {

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }
    this.userroleService.saveUserRole(this.objUserRole, this.isEditMode)
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

          this.gridUserRole = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridUserRole(this.gridUserRole);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });   

          this.objUserRole.userRoleName = "";
          this.objUserRole.code = "";
          this.objUserRole.isActive = false;
          this.objUserRole.userRoleID = "00000000-0000-0000-0000-000000000000";
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

          //alert('Records have been updated successfully');
          //var result = Response.resultObject;

          this.gridUserRole = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridUserRole(this.gridUserRole);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });

          this.objUserRole.userRoleName = "";
          this.objUserRole.code = "";
          this.objUserRole.isActive = false;
          this.objUserRole.userRoleID = "00000000-0000-0000-0000-000000000000";
          this.isEditMode = false;
          this.isDisable = false; //----- Add By Nipuna Franciku
          this.show2 = false;
          this.show = true;
        }
      }, err => {
        //alert('Saved Unsuccessfull');
        console.log('Error')
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  GridEditCellClicked(node) {

    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = true;
    this.show = false;
    this.objUserRole.userRoleID = node.data.UserRoleID;
    this.objUserRole.userRoleName = node.data.UserRoleName;
    this.objUserRole.code = node.data.Code;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objUserRole.isActive = boolValue;
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

  GridDeleteCellClicked(node, Header) {

    this.objDelUserRole = new Userrole();
    this.objDelUserRole = node.data;
    console.log('bbcc=>', this.objDelUserRole); 

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
        this.DeleteUserRole(this.objDelUserRole);
      }
    })
  }

  DeleteUserRole(objDelUserRole) {
    this.userroleService.deleteuserrole(objDelUserRole)
      .subscribe(Response => {

        alert('in');
      }, err => {
        alert('in-Error');
      });
  }

  reset() {
    this.objUserRole.userRoleName = "";
    this.objUserRole.code = "";
    this.objUserRole.isActive = false;
    this.objUserRole.userRoleID = "00000000-0000-0000-0000-000000000000";
    this.isEditMode = false;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = false;
    this.show = true;
  }
}
