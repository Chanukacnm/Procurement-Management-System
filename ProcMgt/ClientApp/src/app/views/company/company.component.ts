import { Component, OnInit } from '@angular/core';
import { company } from '../../models/company';
import { Groupcompany } from '../../models/groupcompany';
import { DataGridTable } from '../../models/datagridtable';
import { CompanyService } from '../../services/company.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import Swal from 'sweetalert2';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  private objCompany: company;
  private objGrpCompany: Groupcompany;
  private objDelGrpCompany: Groupcompany;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridApi2;
  private gridColumnApi;
  private gridColumnApi2;
  private isEditMode = false;
  private isGroupCompany = false;
  private columnDefs;
  private rowData;
  private columnDefs2;
  private rowData2;
  private gridCompany: DataGridTable;
  private gridGroupCompany: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;
  public grpCopanylist: any;

  private groupCompanyName = "";
  private groupCompanyCode = "";
  private gisActive = false;
  private groupUploadFileName = "";
  private groupcompanyAddressLine1 = "";
  private groupcompanyAddressLine2 = "";
  private groupcompanyAddressLine3 = "";
  private groupcompanyAddressLine4 = "";
  private gcompanyTelephoneNo = null;
  private gcompanyFax = "";
  private gcompanyEmail = "";
  private gcompanyWeb = "";
  private gcompanyRegistrationNo = "";
  private vatRegistrationNo = "";

  constructor(private companyService: CompanyService, public dialog: MatDialog) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer,
    }
  }

  ngOnInit() {

    this.objCompany = new company();
    this.objGrpCompany = new Groupcompany();
    this.objCompany.groupCompany = [];
    this.objCompany.companyName = "";
    this.objCompany.companyCode = "";
    this.objCompany.companyAddressLine1 = "";
    this.objCompany.companyAddressLine2 = "";
    this.objCompany.companyAddressLine3 = "";
    this.objCompany.companyAddressLine4 = "";
    this.objCompany.companyTelephoneNo = null;
    this.objCompany.companyFax = ""
    this.objCompany.email = "";
    this.objCompany.companyWeb = "";
    this.objCompany.companyRegistrationNo = "";
    this.objCompany.vatRegistrationNo = "";
    this.objCompany.isActive = false;
    this.objCompany.isGroupofCompany = false;

    this.companyService.getCompanyGrid().subscribe(response => {
      if (response) {
        this.gridCompany = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridCompany(this.gridCompany);
      }
    }, err => {

    });

    this.companyService.getGroupCompanyList(this.objCompany)
      .subscribe(Response => {
        var result = Response;
        if (Response) {

          //console.log("qqqq =>", result.dataGridColumns);
          this.gridGroupCompany = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridGroupCompany(this.gridGroupCompany);
        }
      });

  }

  CreateGridCompany(gridCompany: DataGridTable) {
    this.columnDefs = gridCompany.dataGridColumns;
    this.rowData = gridCompany.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 80, suppressMenu: true, lockPosition: true,
    });

  }

  CreateGridGroupCompany(gridGroupCompany: DataGridTable) {
    this.columnDefs2 = gridGroupCompany.dataGridColumns;

    this.columnDefs2.push({
      headerName: 'Delete',
      cellRenderer: "deletebuttonRenderer", width: 100, suppressMenu: true
    });

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


    params.api.sizeColumnsToFit();
  }

  onGridReady2(params) {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;


    params.api.sizeColumnsToFit();
  }

  isClicked(event) {
    this.isGroupCompany = !this.isGroupCompany;
    this.objCompany.isGroupofCompany = this.isGroupCompany;
  }

  GridEditCellClicked(node, Header) {

    this.isEditMode = true;
    this.show2 = true;
    this.show = false;

    this.objCompany.companyID = node.data.CompanyID;
    this.objCompany.companyName = node.data.CompanyName;
    this.objCompany.companyCode = node.data.CompanyCode;
    this.objCompany.companyAddressLine1 = node.data.CompanyAddressLine1;
    this.objCompany.companyAddressLine2 = node.data.CompanyAddressLine2;
    this.objCompany.companyAddressLine3 = node.data.CompanyAddressLine3;
    this.objCompany.companyAddressLine4 = node.data.CompanyAddressLine4;
    this.objCompany.companyTelephoneNo = node.data.CompanyTelephoneNo;
    this.objCompany.companyFax = node.data.CompanyFax;
    this.objCompany.email = node.data.Email;
    this.objCompany.companyWeb = node.data.CompanyWeb;
    this.objCompany.companyRegistrationNo = node.data.CompanyRegistrationNo;
    this.objCompany.vatRegistrationNo = node.data.VatRegistrationNo;
    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objCompany.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }

    var stringValue2 = node.data.IsGroupofCompany;
    var boolValue = getBoolean2(stringValue2);
    this.objCompany.isGroupofCompany = boolValue;
    function getBoolean2(value2) {
      switch (value2) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }

    this.isGroupCompany = boolValue;

    console.log("qqqq =>", this.isGroupCompany);

    this.companyService.getGroupCompanyList(this.objCompany)
      .subscribe(Response => {
        if (Response) {
          var result = Response;
          console.log("qqqq =>", result);
          this.gridGroupCompany = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridGroupCompany(this.gridGroupCompany);


          this.objCompany.groupCompany = [];
          for (var i = 0; i < result.dataGridRows.length; i++) {
            this.grpCopanylist = result.dataGridRows[i];
            this.objGrpCompany = new Groupcompany();
            
            this.objGrpCompany.GroupCompanyName = this.grpCopanylist['GroupCompanyName'];
            this.objGrpCompany.GroupCompanyCode = this.grpCopanylist['GroupCompanyCode'];
            this.objGrpCompany.GroupCompanyAddressLine1 = this.grpCopanylist['GroupCompanyAddressLine1'];
            this.objGrpCompany.GroupCompanyAddressLine2 = this.grpCopanylist['GroupCompanyAddressLine2'];
            this.objGrpCompany.GroupCompanyAddressLine3 = this.grpCopanylist['GroupCompanyAddressLine3'];
            this.objGrpCompany.GroupCompanyAddressLine4 = this.grpCopanylist['GroupCompanyAddressLine4'];
            this.objGrpCompany.GcompanyTelephoneNo = this.grpCopanylist['GcompanyTelephoneNo'];
            this.objGrpCompany.GcompanyFax = this.grpCopanylist['GcompanyFax'];
            this.objGrpCompany.GcompanyEmail = this.grpCopanylist['GcompanyEmail'];
            this.objGrpCompany.GcompanyWeb = this.grpCopanylist['GcompanyWeb'];
            this.objGrpCompany.GcompanyRegistrationNo = this.grpCopanylist['GcompanyRegistrationNo'];
            this.objGrpCompany.VatRegistrationNo = this.grpCopanylist['VatRegistrationNo'];
            this.objGrpCompany.IsActive = this.grpCopanylist['IsActive'];

            this.objCompany.groupCompany.push(this.objGrpCompany);

          }

          this.rowData2 = this.objCompany.groupCompany

        }
      }, err => {

      });


    console.log("aaa =>", node.data);

  }

  GridDeleteCellClicked(node, Header) {
    this.objDelGrpCompany = new Groupcompany();
    this.objDelGrpCompany = node.data;

    for (var q = 0; q < this.objCompany.groupCompany.length; q++) {
      if (this.objCompany.groupCompany[q] === this.objDelGrpCompany) {

        this.objCompany.groupCompany.splice(q, 1);
        q = this.objCompany.groupCompany.length;
        this.gridApi2.updateRowData({ remove: [this.objDelGrpCompany] });
      }
    }

  }

  AddGroupOfCompanies() {
    if (this.groupCompanyName == "" || this.groupCompanyCode == "" || this.groupcompanyAddressLine1 == "" || this.gcompanyRegistrationNo == "") {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.objGrpCompany = new Groupcompany();
    this.objGrpCompany.GroupCompanyName = this.groupCompanyName;
    this.objGrpCompany.GroupCompanyCode = this.groupCompanyCode;
    this.objGrpCompany.GroupCompanyAddressLine1 = this.groupcompanyAddressLine1;
    this.objGrpCompany.GroupCompanyAddressLine2 = this.groupcompanyAddressLine2;
    this.objGrpCompany.GroupCompanyAddressLine3 = this.groupcompanyAddressLine3;
    this.objGrpCompany.GroupCompanyAddressLine4 = this.groupcompanyAddressLine4;
    this.objGrpCompany.GcompanyTelephoneNo = this.gcompanyTelephoneNo;
    this.objGrpCompany.GcompanyFax = this.gcompanyFax;
    this.objGrpCompany.GcompanyEmail = this.gcompanyEmail;
    this.objGrpCompany.GcompanyWeb = this.gcompanyWeb;
    this.objGrpCompany.GcompanyRegistrationNo = this.gcompanyRegistrationNo;
    this.objGrpCompany.VatRegistrationNo = this.vatRegistrationNo;
    this.objGrpCompany.IsActive = this.gisActive;

    this.objCompany.groupCompany.push(this.objGrpCompany)

    if (this.rowData2 == null) {
      this.rowData2 = this.objCompany.groupCompany;
    }
    else {
      this.gridApi2.setRowData([]);
      this.gridApi2.updateRowData({ add: this.objCompany.groupCompany });
    }

    console.log("zzzz =>", this.objCompany.groupCompany);
    //console.log("qqqq =>", this.rowData2);

    this.gridGroupCompany.dataGridRows = this.objCompany.groupCompany;
    this.gridApi2.redrawRows();

    this.groupCompanyName = "";
    this.groupCompanyCode = "";
    this.groupcompanyAddressLine1 = "";
    this.groupcompanyAddressLine2 = "";
    this.groupcompanyAddressLine3 = "";
    this.groupcompanyAddressLine4 = "";
    this.gcompanyTelephoneNo = null;
    this.gcompanyFax = "";
    this.gcompanyEmail = "";
    this.gcompanyWeb = "";
    this.gcompanyRegistrationNo = "";
    this.vatRegistrationNo = "";
    this.gisActive = false;


  }

  SaveCompany() {

    if (this.objCompany.companyName == "" || this.objCompany.companyCode == "" || this.objCompany.companyAddressLine1 == "" || this.objCompany.companyRegistrationNo == "") {

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }



    if (this.objCompany.isGroupofCompany == true && this.objCompany.groupCompany.length == 0) {
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }
    

    this.companyService.saveCompany(this.objCompany, this.isEditMode)
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

          this.gridCompany = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridCompany(this.gridCompany);


          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objCompany.groupCompany = [];
          this.rowData2 = null;

          this.objCompany.companyID = "00000000-0000-0000-0000-000000000000";
          this.objCompany.companyName = "";
          this.objCompany.companyCode = "";
          this.objCompany.companyAddressLine1 = "";
          this.objCompany.companyAddressLine2 = "";
          this.objCompany.companyAddressLine3 = "";
          this.objCompany.companyAddressLine4 = "";
          this.objCompany.companyTelephoneNo = null;
          this.objCompany.companyFax = ""
          this.objCompany.email = "";
          this.objCompany.companyWeb = "";
          this.objCompany.companyRegistrationNo = "";
          this.objCompany.vatRegistrationNo = "";
          this.objCompany.isActive = false;
          this.objCompany.isGroupofCompany = false;

        }
        else {

          //this.gridCompany = new DataGridTable(result.rowSelection, result.enableSorting,
          //  result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          //this.CreateGridCompany(this.gridCompany);


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

          this.gridCompany = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridCompany(this.gridCompany);


          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objCompany.groupCompany = [];
          this.rowData2 = null;

          this.objCompany.companyID = "00000000-0000-0000-0000-000000000000";
          this.objCompany.companyName = "";
          this.objCompany.companyCode = "";
          this.objCompany.companyAddressLine1 = "";
          this.objCompany.companyAddressLine2 = "";
          this.objCompany.companyAddressLine3 = "";
          this.objCompany.companyAddressLine4 = "";
          this.objCompany.companyTelephoneNo = null;
          this.objCompany.companyFax = ""
          this.objCompany.email = "";
          this.objCompany.companyWeb = "";
          this.objCompany.companyRegistrationNo = "";
          this.objCompany.vatRegistrationNo = "";
          this.objCompany.isActive = false;
          this.objCompany.isGroupofCompany = false;
          this.isEditMode = false;

          this.show2 = false;
          this.show = true;

        }

      }, err => {
        Swal.fire({
          icon: 'error',
          text: 'Request has been Not Saved',

          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#ff4d4d'


        });
      });
   

       


  }


  reset() {
    this.objCompany.groupCompany = [];
    this.rowData2 = null;

    this.objCompany.companyID = "00000000-0000-0000-0000-000000000000";
    this.objCompany.companyName = "";
    this.objCompany.companyCode = "";
    this.objCompany.companyAddressLine1 = "";
    this.objCompany.companyAddressLine2 = "";
    this.objCompany.companyAddressLine3 = "";
    this.objCompany.companyAddressLine4 = "";
    this.objCompany.companyTelephoneNo = null;
    this.objCompany.companyFax = ""
    this.objCompany.email = "";
    this.objCompany.companyWeb = "";
    this.objCompany.companyRegistrationNo = "";
    this.objCompany.vatRegistrationNo = "";
    this.objCompany.isActive = false;
    this.objCompany.isGroupofCompany = false;
    this.isEditMode = false;

    this.show2 = false;
    this.show = true;
  }
}
