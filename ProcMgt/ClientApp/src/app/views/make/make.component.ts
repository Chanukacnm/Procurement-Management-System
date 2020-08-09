import { Component, OnInit } from '@angular/core';
import { Make } from '../../models/make';
import { ItemtypeService } from '../../services/itemtype.service';
import { StatusService } from '../../services/status.service';
import { MakeService } from '../../services/make.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataGridTable } from '../../models/datagridtable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit {

  private objMake: Make;
  private lstItemType;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  selectedItemType = '';
  private isEditMode = false;
  private gridMake: DataGridTable;
  private objMakeDelete: Make;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku


 constructor(private itemTypeService: ItemtypeService, private makeService: MakeService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objMake = new Make();
    this.objMake.makeCode = "";
    this.objMake.makeName = "";
    this.objMake.isActive = false;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objMake.userID = UserDet.userId;
   

    this.itemTypeService.getItemTypeList().subscribe(response => {
      this.lstItemType = response;
    }, err => {
      //alert('in-Error - Item Type ');
    });


    this.makeService.getMakeGridList().subscribe(response => {

      if (response) {

        this.gridMake = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateMake(this.gridMake);
      }
    }, err => {
      //alert('in-Error');
    });
  }

  CreateMake(gridMake: DataGridTable) {


    this.columnDefs = gridMake.dataGridColumns;
    this.rowData = gridMake.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 90, suppressMenu: true, lockPosition: true,
    });

    //----------------------------- Add By Nipuna Franciku -----------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Edit',
    //  filed: 'IsTansactions',
    //  cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true, suppressNavigable: true,
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

  //columnDefs = this.makeService.getmakecolumnDefs();

  //rowData = this.makeService.getmakeRowData();

  ItemTypeChanged(objItemType) {
    //this.objMake.itemTypeID = this.selectedItemType;
    this.selectedItemType = objItemType;
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
    this.selectedItemType = node.data.ItemTypeID;
    this.objMake.itemTypeName = node.data.ItemTypeName;
    this.objMake.itemTypeID = node.data.ItemTypeID;
    this.objMake.makeID = node.data.MakeID;
    this.objMake.makeName = node.data.MakeName;
    this.objMake.makeCode = node.data.MakeCode;
    //this.objMake.isActive = node.data.IsActive;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objMake.isActive = boolValue;
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
    this.objMakeDelete = node.data;
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
        this.DeleteMake(this.objMakeDelete);
      }
    });
    
  }



  SaveMake() {
    if (this.selectedItemType == "" || this.objMake.makeCode == "" || this.objMake.makeName =="") {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.makeService.saveMake(this.objMake, this.isEditMode)
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

          this.gridMake = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateMake(this.gridMake);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });
          
          this.objMake.itemTypeID = "";
          this.objMake.makeCode = "";
          this.objMake.makeName = "";
          this.objMake.isActive = false;
          this.selectedItemType = "";
          this.objMake.makeID = "00000000-0000-0000-0000-000000000000";
          this.isDisable = false; //----- Add By Nipuna Franciku
        }
        else {

          //alert('Records have been updated successfully');
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

          this.gridMake = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateMake(this.gridMake);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objMake.itemTypeID = "";
          this.objMake.makeCode = "";
          this.objMake.makeName = "";
          this.objMake.isActive = false;
          this.selectedItemType = "";
          this.objMake.makeID = "00000000-0000-0000-0000-000000000000";
          this.isEditMode = false;
          this.isDisable = false; //----- Add By Nipuna Franciku

          this.show2 = false;
          this.show = true;
        }
      }, err => {
        //alert('Saved Unsuccessfull');
      });
  }

  reset() {
    this.objMake.itemTypeID = "";
    this.objMake.makeCode = "";
    this.objMake.makeName = "";
    this.objMake.isActive = false;
    this.selectedItemType = "";
    this.objMake.makeID = "00000000-0000-0000-0000-000000000000";
    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
  }

  DeleteMake(objMakeDelete) {
    this.makeService.deleteMakeList(objMakeDelete)
      .subscribe(response => {

        alert('Delete successful');

      }, err => {
        alert('Delete failed');
      });
    

    //GetMakeByID(this.objMake) {
    //  this.makeService.getMakeByID(objMakeDelete)
    //    .subscribe(response => {

    //      alert('deleted');

    //    }, err => {
    //      alert('delete error');
    //    });

    //}

  }

}
