import { Component, OnInit } from '@angular/core';
import { Designation } from '../../models/designation';
import { DataGridTable } from '../../models/datagridtable';
import { DesignationService } from '../../services/designation.service';
import { MatDialog } from '@angular/material';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  private objDesignation: Designation;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private griddesignation: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;

  constructor(private designationService: DesignationService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
    }
  }

  ngOnInit() {

    this.objDesignation = new Designation();
    this.objDesignation.designationCode = "";
    this.objDesignation.designationName = "";
    this.objDesignation.businessUnitTypeName = "";
    this.objDesignation.isActive = false;


    this.designationService.getdesignationGrid().subscribe(response => {

      if (response) {
        this.griddesignation = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridDesignation(this.griddesignation);
      }

    }, err => {

    });
  }

  CreateGridDesignation(griddesignation: DataGridTable) {
    this.columnDefs = griddesignation.dataGridColumns;
    this.rowData = griddesignation.dataGridRows;


    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 70, suppressMenu: true, lockPosition: true,
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


    params.api.sizeColumnsToFit();
  }

  reset() {
    this.objDesignation.designationCode = "";
    this.objDesignation.designationName = "";
    this.objDesignation.businessUnitTypeName = "";
    this.objDesignation.isActive = false;
    this.objDesignation.designationID = "00000000-0000-0000-0000-000000000000";
    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
  }

  GridEditCellClicked(node, Header) {
    this.isEditMode = true;
    this.show2 = true;
    this.show = false;

    console.log("aaa=>", node.data);
    this.objDesignation.designationCode = node.data.DesignationCode;
    this.objDesignation.designationName = node.data.DesignationName;
    this.objDesignation.businessUnitTypeName = node.data.BusinessUnitTypeName;
    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objDesignation.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case "true":
        case "True":
          return true;
        default:
          return false;
      }
    }

    this.objDesignation.designationID = node.data.DesignationID;
  }

  SaveDesignation() {
    console.log("AAAA=>", this.objDesignation)

    if (this.objDesignation.designationCode == "" || this.objDesignation.designationName == "" || this.objDesignation.businessUnitTypeName =="") {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.designationService.saveDesignation(this.objDesignation, this.isEditMode)
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
          this.griddesignation = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridDesignation(this.griddesignation);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objDesignation.designationCode = "";
          this.objDesignation.designationName = "";
          this.objDesignation.businessUnitTypeName = "";
          this.objDesignation.isActive = false;
          this.objDesignation.designationID = "00000000-0000-0000-0000-000000000000";

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
          this.griddesignation = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridDesignation(this.griddesignation);

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
          });

          this.objDesignation.designationCode = "";
          this.objDesignation.designationName = "";
          this.objDesignation.businessUnitTypeName = "";
          this.objDesignation.isActive = false;
          this.objDesignation.designationID = "00000000-0000-0000-0000-000000000000";
          this.isEditMode = false;

          this.show2 = false;
          this.show = true;

        }
      }, err => {
        //alert('Saved Unsuccessfull');
      });

  }

}
