import { Component, OnInit } from '@angular/core';
import { Measurementunits } from '../../models/measurementunits';
import { MeasurementUnitsService} from '../../services/measurementunits.service';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-measurementunits',
  templateUrl: './measurementunits.component.html',
  styleUrls: ['./measurementunits.component.scss']
})
export class MeasurementunitsComponent implements OnInit {

  private objMU: Measurementunits;
  private lststatus;
  private gridApi;
  private gridColumnApi;
  private context;
  private frameworkComponents;
  private columnDefs;
  private rowData;
  private gridMeasurementunits: DataGridTable;
  private objMeasurementunitsDelete: Measurementunits;
  private isEditMode = false;
  public show2: boolean = false;
  public show: boolean = true;
  private isDisable = false; //--- Add By Nipuna Francisku

  constructor(private statusService: StatusService, private measurementUnitsService: MeasurementUnitsService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objMU = new Measurementunits();
    this.objMU.measurementUnitName = "";
    this.objMU.code = "";
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objMU.userID = UserDet.userId;
    this.objMU.isActive = false;
    

    this.measurementUnitsService.getmeasurementUnitstGrid().subscribe(response => {

      if (response) {

        this.gridMeasurementunits = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridMeasurementunits(this.gridMeasurementunits);
      }
    }, err => {
      //alert('in-Error');
    })
  }

  CreateGridMeasurementunits(gridMeasurementunits: DataGridTable) {

    this.columnDefs = gridMeasurementunits.dataGridColumns;
    this.rowData = gridMeasurementunits.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 80, suppressMenu: true, lockPosition: true,
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
  }

  //columnDefs = this.measurementUnitsService.getmeasurnmetUnitscolumnDefs();

  //rowData = this.measurementUnitsService.getmeasurnmetUnitsRowData();

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
    this.objMU.measurementUnitName = node.data.MeasurementUnitName;
    this.objMU.measurementUnitID = node.data.MeasurementUnitID;
    this.objMU.code = node.data.Code;

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objMU.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case "true":
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
    //alert('DeleteIndex :' + rowIndex + ',Header :' + Header);
   
    this.objMeasurementunitsDelete = new Measurementunits();
    this.objMeasurementunitsDelete = node.data;
    console.log('bb=>', node.data);

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
        this.DeleteMeasurementUnit(this.objMeasurementunitsDelete);
      }
    });
  }

  SaveMeasurementUnit() {

    if (this.objMU.measurementUnitName == "" || this.objMU.code == "") {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'
      });
      return false;
    }

    this.measurementUnitsService.saveMeasurementUnit(this.objMU, this.isEditMode)
      .subscribe(response => {
        if (!this.isEditMode) {

          var result = response.resultObject;
          var result2 = response.message;
          var result3 = response.status;

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

         
          this.gridMeasurementunits = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridMeasurementunits(this.gridMeasurementunits);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objMU.measurementUnitName = "";
          this.objMU.code = "";
          this.objMU.isActive = false;
          this.objMU.measurementUnitID = "00000000-0000-0000-0000-000000000000";
          this.isDisable = false; //----- Add By Nipuna Franciku
        }
        else {
          var result = response.resultObject;
          var result2 = response.message;
          var result3 = response.status;

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


          this.gridMeasurementunits = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridMeasurementunits(this.gridMeasurementunits);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });


          this.objMU.measurementUnitName = "";
          this.objMU.code = "";
          this.objMU.isActive = false;
          this.objMU.measurementUnitID = "00000000-0000-0000-0000-000000000000";

          this.isEditMode = false;
          this.isDisable = false; //----- Add By Nipuna Franciku


          this.show2 = false;
          this.show = true;

        }    

      }, err => {
        //alert('The record has been saved successfully');
      });

  }

  DeleteMeasurementUnit(objMU) {

    this.measurementUnitsService.deleteMeasurementunits(objMU)
      .subscribe(response => {

        alert('deleted');

      }, err => {
        alert('delete error');
      });

  }

  reset() {
    this.objMU.measurementUnitName = "";
    this.objMU.code = "";
    this.objMU.isActive = false;
    this.objMU.measurementUnitID = "00000000-0000-0000-0000-000000000000";
    this.isEditMode = false;
    this.show2 = false;
    this.show = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
  }
}
