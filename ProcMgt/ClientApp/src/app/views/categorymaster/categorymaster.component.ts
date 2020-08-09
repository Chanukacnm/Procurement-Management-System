import { Component, OnInit } from '@angular/core';
import { Categorymaster } from '../../models/categorymaster';
import { CategorymasterService } from '../../services/categorymaster.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { Response } from 'selenium-webdriver/http';
import { DataGridTable } from '../../models/datagridtable';
import { map, first } from 'rxjs/operators';
import { RowNode } from 'ag-grid-community';
import * as moment from 'moment';
import Swal from 'sweetalert2';
//import * as bootbox from 'bootbox/bootbox.js';

@Component({
  selector: 'app-categorymaster',
  templateUrl: './categorymaster.component.html',
  styleUrls: ['./categorymaster.component.scss']
})
export class CategorymasterComponent implements OnInit {
  
  private objCategoryMaster: Categorymaster;
  private objDelCategory: Categorymaster;
  private context;
  private frameworkComponents;
  private lstCategoryMaster;
  private gridApi; 
  private gridColumnApi;
  private isEditMode = false;
  private categoryID;
  private name;
  private categoryCode;
  private isActive;
  private columnDefs;
  private rowData;
  private gridCategoryMaster: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku


  constructor( private categoryMasterService: CategorymasterService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {

    this.objCategoryMaster = new Categorymaster();
    this.objCategoryMaster.categoryName = "";
    this.objCategoryMaster.categoryCode = "";
    this.objCategoryMaster.isActive = false;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objCategoryMaster.userID = UserDet.userId;
    
    //this.objCategoryMaster.requiredDate = "2019-11-05";

    this.categoryMasterService.getcategoryMasterGrid().subscribe(response => {

      if (response) {
        this.gridCategoryMaster = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridCategoryMaster(this.gridCategoryMaster);
      }

    }, err => {
      
    });
  }

  CreateGridCategoryMaster(gridCategoryMaster: DataGridTable) {
    this.columnDefs = gridCategoryMaster.dataGridColumns;
    this.rowData = gridCategoryMaster.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 70, suppressMenu: true, lockPosition: true,
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
 
    params.api.sizeColumnsToFit();
  }

  //onRowClicked(event: any) {
  //  console.log('row', event);
  //  console.log('aa=>', event.data);
  //  this.objDelCategory = new Categorymaster();
  //  this.objDelCategory = event.data;
  //  console.log('bb=>', this.objDelCategory);

  //  this.DeleteCategoryMaster(this.objDelCategory);
    
  //}

  DeleteCategoryMaster(objDelCategory) {
    this.categoryMasterService.deleteCategoryMaster(objDelCategory)
      .subscribe(Response => {

        alert('Deleted Successfull');
      }, err => {
        alert('Deleted Unsuccessfull');
      });
  }
 
  reset() {
    this.objCategoryMaster.categoryCode = "";
    this.objCategoryMaster.categoryName = "";
    this.objCategoryMaster.isActive = false;
    this.objCategoryMaster.categoryID = "00000000-0000-0000-0000-000000000000";
    this.isEditMode = false;
    this.isDisable = false; //--- Add By Nipuna Francisku

    this.show2 = false;
    this.show = true;
  }


  GridEditCellClicked(node, Header) {

    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = true;
    this.show = false;
    this.objCategoryMaster.categoryCode = node.data.CategoryCode;
    this.objCategoryMaster.categoryName = node.data.CategoryName;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objCategoryMaster.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case "true":
        case "True":
          return true;
        default:
          return false;
      }
    }

    //this.objCategoryMaster.isActive = node.data.IsActive; 
    this.objCategoryMaster.categoryID = node.data.CategoryID;

    //console.log("---------------------------");
        
    //var date3 = "04/28/2016".split(/\//).reverse().join("-");    
    //console.log(date3);
    
    //var aaaa = "02/28/2020".split("/");
    //console.log([aaaa[1], aaaa[0], aaaa[2]].reverse().join("-"));
    //this.objCategoryMaster.requiredDate = ([aaaa[1], aaaa[0], aaaa[2]].reverse().join("-"));

    //var mydate = moment('02/28/2020', 'MM/DD/YYYY');
     
    //console.log(moment(mydate).format("YYYY-MM-DD"));

    //console.log("--------------------------");

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
    
    this.objDelCategory = new Categorymaster();
    this.objDelCategory = node.data;
    console.log('bbbc=>', this.objDelCategory);

       
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
        this.DeleteCategoryMaster(this.objDelCategory);
      }
    });
  }
   
  SaveCategoryMaster() {
    if (this.objCategoryMaster.categoryCode == "" || this.objCategoryMaster.categoryName == "") {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }
    debugger;
    this.categoryMasterService.saveCategoryMaster(this.objCategoryMaster, this.isEditMode)
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

          
           
         // alert('The record has been saved successfully');
          var result = Response.resultObject;
          this.gridCategoryMaster = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridCategoryMaster(this.gridCategoryMaster);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objCategoryMaster.categoryCode = "";
          this.objCategoryMaster.categoryName = "";
          this.objCategoryMaster.isActive = false;
          this.objCategoryMaster.categoryID = "00000000-0000-0000-0000-000000000000";
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
          //var result = Response.resultObject;
          this.gridCategoryMaster = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridCategoryMaster(this.gridCategoryMaster);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });

          this.objCategoryMaster.categoryCode = "";
          this.objCategoryMaster.categoryName = "";
          this.objCategoryMaster.isActive = false;
          this.objCategoryMaster.categoryID = "00000000-0000-0000-0000-000000000000";
          this.isEditMode = false;
          this.isDisable = false; //--- Add By Nipuna Francisku

          this.show2 = false;
          this.show = true;

        }        
      }, err => {
        //alert('Saved Unsuccessfull');
      });

  }

}
