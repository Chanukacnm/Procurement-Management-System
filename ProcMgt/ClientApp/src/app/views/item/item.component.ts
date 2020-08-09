import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ItemtypeService } from '../../services/itemtype.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { Response } from 'selenium-webdriver/http';
import { DataGridTable } from '../../models/datagridtable';
import { map } from 'rxjs/operators';
import { RowNode } from 'ag-grid-community';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { concat } from 'rxjs';
import { Stock } from '../../models/stock';
import { Itemview } from '../../models/itemview';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})


export class ItemComponent implements OnInit {

  private objItem: Item;
  private objstock: Stock;
  private objitemView: Itemview;
  private lstItemType; 
  private context;
  private frameworkComponents; 
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  selectedItemType = '';
  private isEditMode = false;
  private gridItem: DataGridTable;
  private objItemDelete: Item;
  public show2: boolean = false;
  public show: boolean = true;
  public show3: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku

  constructor(private itemTypeService: ItemtypeService, private itemService: ItemService, public dialog: MatDialog) {

      this.context = { componentParent: this };
      this.frameworkComponents = {
        buttonRenderer: ButtonRenderer,
        deletebuttonRenderer: DeleteButtonRenderer
      }
  }

  ngOnInit() {
    this.objItem = new Item();
    this.objstock = new Stock();
    this.objitemView = new Itemview();
    this.objItem.itemDescription = "";
    this.objItem.itemCode = "";
    this.objItem.initialQty = null;
    this.objItem.isActive = false;
    this.objItem.reOrderQuantity;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objItem.userID = UserDet.userId;
    //this.objitemView.stock = [];
    //this.objitemView.items = [];

    this.itemTypeService.getItemTypeList().subscribe(response => {
      this.lstItemType = response;
    }, err => {
      //alert('in-Error - Item Type ');
    });

    this.itemService.getItemGridList().subscribe(response => {

      if (response) {

        this.gridItem = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateItem(this.gridItem);
      }
    }, err => {
      //alert('in-Error');
    });

  }

  CreateItem(gridItem: DataGridTable) {

    this.columnDefs = gridItem.dataGridColumns;
    this.rowData = gridItem.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 90, suppressMenu: true ,lockPosition: true,
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

  ItemTypeChanged(objItemType) {
    
    this.selectedItemType = objItemType;
  }

  GridEditCellClicked(node) {
    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = true;
    this.show = false;
    this.show3 = false;
    this.objItem.itemID = node.data.ItemID;
    this.objItem.itemTypeID = node.data.ItemTypeID;
    this.selectedItemType = node.data.ItemTypeID;
    this.objItem.itemDescription = node.data.ItemDescription;
    this.objItem.itemCode = node.data.ItemCode;
    this.objItem.initialQty = node.data.InitialQty;
    this.objItem.itemTypeName = node.data.ItemTypeName;
    this.objItem.reOrderQuantity = node.data.ReOrderQuantity;
    this.objItem.currentQty = node.data.CurrentQty;


    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objItem.isActive = boolValue;
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
    this.objItemDelete = new Item();
    this.objItemDelete = node.data;
    console.log('bbbc=>', this.objItemDelete);

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
        this.DeleteItem(this.objItemDelete);
      }
    });
  }


  SaveItem() {
    if (this.selectedItemType == "" || this.objItem.itemDescription == "" || this.objItem.initialQty == null || this.objItem.itemCode =="") {
      
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.objItem.currentQty = this.objItem.initialQty;
    this.objstock.stockQty = this.objItem.initialQty;
    this.objstock.balancedQty = this.objItem.initialQty;

    console.log("stock=>", this.objstock);

    //this.objitemView.objstock.push(this.objstock);
    this.objitemView.items = this.objItem;
    this.objitemView.stock = this.objstock ;
    console.log("ItemView=>", this.objitemView);

    this.itemService.saveItem(this.objitemView,this.isEditMode)
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

          this.gridItem = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateItem(this.gridItem);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });
          

          this.objItem.itemID = "00000000-0000-0000-0000-000000000000";
          this.objItem.itemTypeID = "";
          this.selectedItemType = "";
          this.objItem.itemDescription = "";
          this.objItem.initialQty = null;
          this.objItem.currentQty = null;
          this.objItem.itemCode = "";
          this.objItem.reOrderQuantity = null;
          this.objItem.isActive = false;
          //this.objitemView.items = [];
          //this.objitemView.stock = [];
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

          this.gridItem = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateItem(this.gridItem);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });

          this.objItem.itemID = "00000000-0000-0000-0000-000000000000";
          this.objItem.itemTypeID = "";
          this.selectedItemType = "";
          this.objItem.itemDescription = "";
          this.objItem.initialQty = null;
          this.objItem.currentQty = null;
          this.objItem.itemCode = "";
          this.objItem.reOrderQuantity = null;
          this.objItem.isActive = false;
          //this.objitemView.items = [];
          //this.objitemView.stock = [];
          this.isDisable = false; //----- Add By Nipuna Franciku

          this.isEditMode = false;

          this.show2 = false;
          this.show = true;
          this.show3 = true;
        }

      }, err => {
        //alert('Save Unsuccessful');
        Swal.fire({

          icon: 'error',
          text: 'Records have been Not Saved!',

          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#61CD23',

        });

        this.objItem.itemID = "00000000-0000-0000-0000-000000000000";
        this.objItem.itemTypeID = "";
        this.selectedItemType = "";
        this.objItem.itemDescription = "";
        this.objItem.initialQty = null;
        this.objItem.currentQty = null;
        this.objItem.itemCode = "";
        this.objItem.reOrderQuantity = null;
        this.objItem.isActive = false;
        //this.objitemView.items = [];
        //this.objitemView.stock = [];

        this.isEditMode = false;
        this.isDisable = false; //----- Add By Nipuna Franciku

      });
  }

  reset() {
    this.objItem.itemID = "00000000-0000-0000-0000-000000000000";
    this.objItem.itemTypeID = "";
    this.selectedItemType = "";
    this.objItem.itemDescription = "";
    this.objItem.initialQty = null;
    this.objItem.currentQty = null;
    this.objItem.itemCode = "";
    this.objItem.reOrderQuantity = null;
    this.objItem.isActive = false;
    //this.objitemView.items = [];
    //this.objitemView.stock = [];

    this.isEditMode = false;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.show2 = false;
    this.show = true;
    this.show3 = true;
  }

  DeleteItem(objItemDelete) {
    this.itemService.deleteItemList(objItemDelete)
      .subscribe(response => {

        alert('Deleted Successfully');

      }, err => {
        alert('Delete Unsuccessful');
      });
  }
}
