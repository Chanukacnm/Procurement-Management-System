import { Component, OnInit } from '@angular/core';
import { Itemtype } from '../../models/itemtype';
import { StatusService } from '../../services/status.service';
import { MeasurementUnitsService } from '../../services/measurementunits.service';
import { ItemtypeService } from '../../services/itemtype.service';
import { CategorymasterService } from '../../services/categorymaster.service';
import { ApprovalpatterntypeService } from '../../services/approvalpatterntype.service';
import { ReorderlevelService } from '../../services/reorderlevel.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-itemtypmaster',
  templateUrl: './itemtypmaster.component.html',
  styleUrls: ['./itemtypmaster.component.scss']
})
export class ItemtypmasterComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private context;
  private frameworkComponents;
  private objitemtypemaster: Itemtype;
  private lstCategory;
  private lstmeasurementUnit;
  private lststatus;
  private lstApprovalPatternType;
  private lstReorderlevel;
  selectedCategory = '';
  selectedMeasurementUnit = '';
  selectedApprovalPatternType = '';
  private isEditMode = false;
  private gridItemTypeMaster: DataGridTable;
  private columnDefs;
  private rowData;
  private objitemtypemasterDelete: Itemtype;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku

  constructor( private MeasurementUnitService: MeasurementUnitsService, 
    private categoryService: CategorymasterService, private approvalpatterntypeService: ApprovalpatterntypeService,
    private reorderlevelService: ReorderlevelService, private itemTypeService: ItemtypeService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {

    this.objitemtypemaster = new Itemtype();
    this.objitemtypemaster.itemTypeCode = "";
    this.objitemtypemaster.depreciationRate ;
    this.objitemtypemaster.itemTypeName = "";
    this.objitemtypemaster.isActive = false;
    this.objitemtypemaster.isDisposable = false;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objitemtypemaster.userID = UserDet.userId;
    

    this.MeasurementUnitService.getMeasurementUnitsList().subscribe(response => {
    
      this.lstmeasurementUnit = response;
    }, err => {
      //alert('in-Error measurement unit');
    });

    this.approvalpatterntypeService.getApprovalPattternTypeList().subscribe(response => {
     
      this.lstApprovalPatternType = response;
    }, err => {
      //alert('in-Error approval');
      });

    this.categoryService.getcategoryMasterList().subscribe(response => {
     
      this.lstCategory = response;
    }, err => {
      //alert('in-Error Category');
    });

    this.itemTypeService.getitemTypeMasterGridList().subscribe(response => {

      if (response) {

        this.gridItemTypeMaster = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateItemTypeMaster(this.gridItemTypeMaster);
      }

    }, err => {
      //alert('in-Error');
    });
  }

  CreateItemTypeMaster(gridItemTypeMaster: DataGridTable) {

    this.columnDefs = gridItemTypeMaster.dataGridColumns;
    this.rowData = gridItemTypeMaster.dataGridRows;

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

  CategoryChanged(objCategory) {
    //this.objitemtypemaster.itemCategoryID = this.selectedItemCategory;
    this.selectedCategory = objCategory;
  }

  MeasurementUnitChanged(objMeasurementUnit) {
    //this.objitemtypemaster.measurementUnitID = this.selectedMeasurementUnit;
    this.selectedMeasurementUnit = objMeasurementUnit;
  }

  ApprovalPatternTypeChanged(objApprovalPatternType) {
    //this.objitemtypemaster.approvalPatternTypeID = this.selectedApprovalPatternType;
    this.selectedApprovalPatternType = objApprovalPatternType;
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
    this.objitemtypemaster.itemTypeID = node.data.ItemTypeID;
    this.objitemtypemaster.approvalPatternTypeID = node.data.ApprovalPatternTypeID;
    this.objitemtypemaster.depreciationRate = node.data.DepreciationRate;
    this.objitemtypemaster.categoryID = node.data.CategoryID;
    //this.objitemtypemaster.isDisposable = node.data.IsDisposable;
    this.objitemtypemaster.itemTypeCode = node.data.ItemTypeCode;
    this.objitemtypemaster.itemTypeName = node.data.ItemTypeName;
    this.objitemtypemaster.measurementUnitID = node.data.MeasurementUnitID;
    //this.objitemtypemaster.isActive = node.data.IsActive;
    this.objitemtypemaster.categoryName = node.data.CategoryName;
    this.objitemtypemaster.measurementUnitName = node.data.MeasurementUnitName;
    this.objitemtypemaster.patternName = node.data.PatternName;

    this.selectedCategory = node.data.CategoryID;
    this.selectedMeasurementUnit = node.data.MeasurementUnitID;
    this.selectedApprovalPatternType = node.data.ApprovalPatternTypeID;

    var stringValue = node.data.IsActive; 
    var boolValue = getBoolean(stringValue);
    this.objitemtypemaster.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }

    var stringValue2 = node.data.IsDisposable;
    var boolValue2 = getBoolean2(stringValue2);
    this.objitemtypemaster.isDisposable = boolValue2;
    function getBoolean2(value) {
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
    this.objitemtypemasterDelete = node.data;
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
        this.DeleteItemType(this.objitemtypemasterDelete);
      }
    });
  }

  SaveItemType() {

    if (this.selectedCategory == "" || this.selectedMeasurementUnit == "" || this.selectedApprovalPatternType == "" || this.objitemtypemaster.itemTypeCode == "" || this.objitemtypemaster.itemTypeName == "") {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;    
    }
        
    this.itemTypeService.saveItemType(this.objitemtypemaster, this.isEditMode)
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
          

          this.gridItemTypeMaster = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateItemTypeMaster(this.gridItemTypeMaster);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });


          this.objitemtypemaster.itemTypeCode = "";
          this.objitemtypemaster.itemTypeName = "";
          this.objitemtypemaster.depreciationRate = null;
          this.objitemtypemaster.isActive = false;
          this.objitemtypemaster.isDisposable = false;
          this.objitemtypemaster.categoryID = "";
          this.objitemtypemaster.approvalPatternTypeID = "";
          this.objitemtypemaster.measurementUnitID = "";
          this.objitemtypemaster.itemTypeID = "00000000-0000-0000-0000-000000000000";
          this.selectedCategory = "";
          this.selectedMeasurementUnit = "";
          this.selectedApprovalPatternType = "";
          this.isDisable = false; //----- Add By Nipuna Franciku

        }
        else
        {

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
          

          this.gridItemTypeMaster = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateItemTypeMaster(this.gridItemTypeMaster);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });

          this.objitemtypemaster.itemTypeCode = "";
          this.objitemtypemaster.itemTypeName = "";
          this.objitemtypemaster.depreciationRate = null;
          this.objitemtypemaster.isActive = false;
          this.objitemtypemaster.isDisposable = false;
          this.objitemtypemaster.categoryID = "";
          this.objitemtypemaster.approvalPatternTypeID = "";
          this.objitemtypemaster.measurementUnitID = "";
          this.objitemtypemaster.itemTypeID = "00000000-0000-0000-0000-000000000000";
          this.selectedCategory = "";
          this.selectedMeasurementUnit = "";
          this.selectedApprovalPatternType = "";
          this.isEditMode = false;
          this.isDisable = false; //----- Add By Nipuna Franciku

          this.show2 = false;
          this.show = true;
        }
      }, err => {
        //alert('Saved Unsuccessfull');
      });
  }

  DeleteItemType(objitemtypemasterDelete) {
    this.itemTypeService.deleteItemtypeList(objitemtypemasterDelete)
      .subscribe(response => {

        alert('Deleted');

      }, err => {
        alert('Delete Failed');
      });
  }

  reset() {
    this.objitemtypemaster.itemTypeCode = "";
    this.objitemtypemaster.depreciationRate = null;
    this.objitemtypemaster.itemTypeName = "";
    this.objitemtypemaster.isActive = false;
    this.objitemtypemaster.isDisposable = false;
    this.objitemtypemaster.categoryID = "";
    this.objitemtypemaster.approvalPatternTypeID = "";
    this.objitemtypemaster.measurementUnitID = "";
    this.objitemtypemaster.itemTypeID = "00000000-0000-0000-0000-000000000000";
    this.isEditMode = false;

    this.selectedCategory = "";
    this.selectedMeasurementUnit = "";
    this.selectedApprovalPatternType = "";

    this.show2 = false;
    this.show = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
  }
}
