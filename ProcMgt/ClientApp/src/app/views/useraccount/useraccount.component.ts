import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../../models/user';
import { CompanyService } from '../../services/company.service';
import { DepartmentService } from '../../services/department.service';
import { DesignationService } from '../../services/designation.service';
import { UserroleService } from '../../services/userrole.service';
import { StatusService } from '../../services/status.service';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { UseraccountService } from '../../services/useraccount.service';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
//import { Md5 } from 'ts-md5/dist/md5';
//import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Designationbusinessunit } from '../../models/designationbusinessunit';
import { Businessunits } from '../../models/businessunits';
import { Businessunittype } from '../../models/businessunittype';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent implements OnInit {

  private objUserAccount: User;
  private objDesignationBusinessUnit: Designationbusinessunit;
  private objDelUserAccount: User;
  private objBusinessUnits: Businessunits;
  private objbusinessUnitType: Businessunittype;
  private lstCompany;
  private lstDepartment;
  private lstDepartment2;
  private lstDesignation;
  private lstApprDesignation;
  private lstRole;
  private lstDesignationLevel;
  private lstBusinessUnits;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  private selectedCompany = '';
  private selectedDepartment = '';
  private selectedDesignation = '';
  private selectedApprDesignation = '';
  private selectedDesignationLevel = '';
  private selectedBusinessUnits  = '';
  private selectedUserRole = '';
  private isEditMode = false;
  public show: boolean = true;
  private columnDefs;
  private rowData;
  private columnDefs2;
  private rowData2;
  private LoadCompany='';
  private gridUserAccount: DataGridTable;
  private gridApprovalUser: DataGridTable;
  public show3: boolean = false;   
  public show2: boolean = true;
  private isApprovalUser = false;
  private isDisable = false; //--- Add By Nipuna Francisku

  
  private designationName = '';
  private businessUnitTypeName = '';
  private businessUnitsName = '';
  
  constructor(private companyService: CompanyService, private departmentService: DepartmentService,
    private designationService: DesignationService, private userRoleService: UserroleService, private elem: ElementRef,
    private statusService: StatusService, private useraccountService: UseraccountService, public dialog: MatDialog)
  {

    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objUserAccount = new User();
    this.objDesignationBusinessUnit = new Designationbusinessunit();
    this.objBusinessUnits = new Businessunits();
    this.objbusinessUnitType = new Businessunittype();
    this.objUserAccount.employeeNo = "";
    this.objUserAccount.name = "";
    this.objUserAccount.email = "";
    this.objUserAccount.userName = "";
    this.objUserAccount.password = "";
    this.objUserAccount.isActive = false;
    this.objDesignationBusinessUnit.businessUnits = [];
    this.objUserAccount.designationbusinessunit = [];
    

    this.companyService.getcompanyList().subscribe(response => {
     this.lstCompany = response;
    }, err => {
     //alert('in-Error - Company');
    });    

    //this.departmentService.getdepartmentList().subscribe(response => {
    //  this.lstDepartment2 = response;
    //}, err => {
    //  alert('in-Error - Department');
    //});

    this.designationService.getdesignationList().subscribe(response => {
      this.lstDesignation = response;
      this.lstApprDesignation = response;
    }, err => {
      //alert('in-Error - Designation');
    });

    this.userRoleService.getuserRoleList().subscribe(response => {
      this.lstRole = response;
    }, err => {
      //alert('in-Error - User Role');
      });

    //this.useraccountService.getDesignationLevel().subscribe(response => {
    //  this.lstDesignationLevel = response;
    //  //console.log("aaaaaaaa=>", this.lstDesignationLevel);
    //}, err => {
    //  //alert('in-Error - User Role');
    //});

    //this.useraccountService.getBusinessUnits().subscribe(response => {
    //  this.lstBusinessUnits = response;
    //  console.log("aaaaaaaa=>", this.lstBusinessUnits);
    //}, err => {
    //  //alert('in-Error - User Role');
    //});

    this.useraccountService.getUserAccountGrid().subscribe(response => {
      if (response) {
        this.gridUserAccount = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit,  response.dataGridColumns, response.dataGridRows);
        this.CreateGridUserAccount(this.gridUserAccount);
      }
    })

    this.useraccountService.getApprovalUserGrid(this.objDesignationBusinessUnit)
      .subscribe(response => {
        if (response) {

          this.gridApprovalUser = new DataGridTable(response.rowSelection, response.enableSorting,
            response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
          this.CreateGridApprovalUser(this.gridApprovalUser);
        }
      });
  }

  CreateGridUserAccount(gridUserAccount: DataGridTable) {
    this.columnDefs = gridUserAccount.dataGridColumns;
    this.rowData = gridUserAccount.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
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
    //  cellRenderer: "deletebuttonRenderer", width: 120, suppressMenu: true
    //});
  }

  CreateGridApprovalUser(gridApprovalUser: DataGridTable) {
    this.columnDefs2 = gridApprovalUser.dataGridColumns;


    this.columnDefs2.push({
      headerName: 'Delete',
      cellRenderer: "deletebuttonRenderer", width: 120, suppressMenu: true
    });
  }

  isClicked(event) {
    this.isApprovalUser = !this.isApprovalUser;
    this.objUserAccount.isApprovalUser = this.isApprovalUser;
  }

  CompanyChanged(objCompany) {
    this.selectedCompany = objCompany;
    console.log("aaaa=>", this.objUserAccount.companyID);
    this.objUserAccount.departmentID = "00000000-0000-0000-0000-000000000000";
    this.selectedDepartment = "";
    this.lstDepartment = null;
    this.departmentService.getSpecDepartmentList(this.objUserAccount)
      .subscribe(Response => {
        this.lstDepartment = Response.resultObject;
        console.log("cccc=>",this.lstDepartment);
      }, err => {
        //alert('Departmant List Error');
      });
    //this.objUserAccount.companyID = this.selectedCompany;
  }

  DepartmentChanged(objDepartment) {
    this.selectedDepartment = objDepartment;
    //this.objUserAccount.departmentID = this.selectedDepartment;
  }

  ApprDesignationChanged(objApprDesignation) {
    this.selectedApprDesignation = objApprDesignation;
    this.objUserAccount.businessUnitTypeID = "00000000-0000-0000-0000-000000000000";
    this.selectedDesignationLevel = "";
    this.lstDesignationLevel = null;

    this.objbusinessUnitType.designationID = this.objUserAccount.apprDesignationID; 
    this.useraccountService.getDesignationLevel(this.objbusinessUnitType)
      .subscribe(response => {
        this.lstDesignationLevel = response.resultObject;;
        //console.log("aaaaaaaa=>", this.lstDesignationLevel);
      }, err => {
        //alert('in-Error - User Role');
      });

  }

  DesignationChanged(objDesignation) {
    this.selectedDesignation = objDesignation;
    //this.objUserAccount.designationID = this.selectedDesignation;
    //console.log("qqqqq=>", this.objUserAccount.designationID);
    

  }

  DesignationLevelChanged(objDesignationLevel) {
    this.selectedDesignationLevel = objDesignationLevel;
    //this.objUserAccount.designationID = this.selectedDesignation;
    this.objUserAccount.businessUnitsID = "00000000-0000-0000-0000-000000000000";
    this.selectedBusinessUnits = "";
    this.lstBusinessUnits = null;

    
    this.useraccountService.getBusinessUnits(this.objUserAccount)
      .subscribe(response => {
        this.lstBusinessUnits = response.resultObject;
        console.log("aaaaaaaa=>", this.lstBusinessUnits);
      }, err => {
       //alert('in-Error - User Role');
      });
  }

  BusinessUnitsChanged(objBusinessUnits) {
    this.selectedBusinessUnits = objBusinessUnits;
    //this.objUserAccount.designationID = this.selectedDesignation;
  }

  UserRoleChanged(objUserRole) {
    this.selectedUserRole = objUserRole;
    //this.objUserAccount.userRoleID = this.selectedUserRole;
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

  GridEditCellClicked(node, Header) {

    this.isEditMode = true;
    this.isDisable = false; //----- Add By Nipuna Franciku
    //this.show = false;
    this.show3 = true;
    this.show2 = false;
    console.log('data =>', node.data);
    this.objUserAccount.employeeNo = node.data.EmployeeNo;
    this.objUserAccount.name = node.data.Name;
    this.objUserAccount.email = node.data.Email;
    this.objUserAccount.departmentName = node.data.DepartmentName;
    this.objUserAccount.designationName = node.data.DesignationName;
    this.objUserAccount.userRoleName = node.data.UserroleName;
    this.objUserAccount.designationID = node.data.DesignationID;
    
    this.objUserAccount.userRoleID = node.data.UserRoleID;
    this.objUserAccount.userID = node.data.UserID;
    this.objUserAccount.companyID = node.data.CompanyID;
    this.objUserAccount.departmentID = node.data.DepartmentID;
    this.selectedDepartment = node.data.DepartmentID;


    this.departmentService.getSpecDepartmentList(this.objUserAccount)
      .subscribe(Response => {
        this.lstDepartment = Response.resultObject;
        console.log("cccc=>", this.lstDepartment);
      }, err => {
        //alert('Departmant List Error');
      });

    this.selectedDesignation = node.data.DesignationID;
    this.selectedUserRole = node.data.UserRoleID;
    this.selectedCompany = node.data.CompanyID;
    
    this.objUserAccount.userName = node.data.UserName;
    this.objUserAccount.password = node.data.Password; 

    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue); 
    this.objUserAccount.isActive = boolValue;
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
    this.objDelUserAccount = new User();
    this.objDelUserAccount = node.data;
    console.log('bbbc=>', this.objDelUserAccount);

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
        this.DeleteUserAccount(this.objDelUserAccount);
      }
    });
  }

  DeleteUserAccount(objDelUserAccount) {
    this.useraccountService.deleteUserAccount(objDelUserAccount)
      .subscribe(Response => {
        alert('in');
      }, err => {
        alert('in-Error');
      });
  }

  AddGroupOfCompanies() {
    console.log("qqqqqqq=>", this.objUserAccount);
    if (this.selectedDesignation == "" ) {
      alert('Please fill the mandatory fields');
      return false;
    }
    this.objDesignationBusinessUnit = new Designationbusinessunit();
    this.objBusinessUnits = new Businessunits();
    this.objDesignationBusinessUnit.businessUnits = [];
    this.objUserAccount.designationbusinessunit = [];
    //this.objDesignationBusinessUnit.designationID = this.objUserAccount.designationID;
    //this.objDesignationBusinessUnit.businessUnitTypeID = this.objUserAccount.businessUnitTypeID;
    //this.objDesignationBusinessUnit.businessUnitsID = this.objUserAccount.businessUnitsID;
    console.log("zzzzzz=>", this.lstDesignationLevel);

    for (var i = 0; i < this.lstDesignation.length; i++) {
      if (this.lstDesignation[i].designationID === this.objUserAccount.designationID) {
        this.objDesignationBusinessUnit.designationID = this.lstDesignation[i].designationID;
        this.objDesignationBusinessUnit.DesignationName = this.lstDesignation[i].designationName;
      }

    }

    for (var i = 0; i < this.lstDesignationLevel.length; i++) {
      if (this.lstDesignationLevel[i].businessUnitTypeID === this.objUserAccount.businessUnitTypeID) {
        this.objDesignationBusinessUnit.businessUnitTypeID = this.lstDesignationLevel[i].businessUnitTypeID;
        this.objDesignationBusinessUnit.BusinessUnitTypeName = this.lstDesignationLevel[i].businessUnitTypeName;
      }

    }

    if (this.objUserAccount.businessUnitsID != "") {
      for (var i = 0; i < this.lstBusinessUnits.length; i++) {
        if (this.lstBusinessUnits[i].businessUnitsID === this.objUserAccount.businessUnitsID[i]) {
          this.objBusinessUnits.businessUnitsID = this.lstBusinessUnits[i].businessUnitsID;
          this.objBusinessUnits.BusinessUnitsName = this.lstBusinessUnits[i].businessUnitsName;
          console.log("wwwww=>", this.objBusinessUnits);
          this.objDesignationBusinessUnit.businessUnits.push(this.objBusinessUnits);

        }

      }
      this.objUserAccount.designationbusinessunit.push(this.objDesignationBusinessUnit);
    }
    

    //console.log("aaaaaaaaa=>", this.objDesignationBusinessUnit);
    console.log("qqqqqqq=>", this.objUserAccount);

    if (this.rowData2 == null) {
      this.rowData2 = this.objUserAccount.designationbusinessunit;
      console.log("aaaa=>", this.rowData2);
    }
    else {
      this.gridApi2.setRowData([]);
      //this.gridApi.updateRowData({ remove: this.supplierItemsRowData });
      this.gridApi2.updateRowData({ add: this.objUserAccount.designationbusinessunit });
    }

    this.gridApi2.redrawRows();
    
  }

  SaveUserAccount() {
    if (this.selectedDepartment == "" || this.selectedCompany =="" || this.selectedDesignation == "" || this.selectedUserRole == "" || this.objUserAccount.name == ""  || this.objUserAccount.email == "" || this.objUserAccount.userName == "" || this.objUserAccount.password == "") {
      

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    if (this.objUserAccount.password.length < 8 ) {
      return false;
    }

    this.objUserAccount.dateTime = moment().format("MM/DD/YYYY HH:mm:ss");
    

    this.useraccountService.SaveUserAccount(this.objUserAccount, this.isEditMode)
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

          this.gridUserAccount = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridUserAccount(this.gridUserAccount);

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objUserAccount.userID = "00000000-0000-0000-0000-000000000000";
          this.objUserAccount.name = ""
          this.objUserAccount.employeeNo = ""
          this.objUserAccount.departmentID = "";
          this.selectedDepartment = "";
          this.objUserAccount.email = "";
          this.objUserAccount.designationID = "";
          this.selectedDesignation = "";
          this.objUserAccount.userRoleID = "";
          this.selectedUserRole = "";
          this.objUserAccount.companyID = "";
          this.selectedCompany = "";
          this.objUserAccount.isActive = false;
          this.objUserAccount.userName = "";
          this.objUserAccount.password = "";
          this.isDisable = false; //----- Add By Nipuna Franciku
        }
        else {

          
          //alert('Updated Successfull');
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

          this.gridUserAccount = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridUserAccount(this.gridUserAccount);


          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objUserAccount.userID = "00000000-0000-0000-0000-000000000000";
          this.objUserAccount.name = ""
          this.objUserAccount.employeeNo = ""
          this.objUserAccount.departmentID = "";
          this.selectedDepartment = "";
          this.objUserAccount.email = "";
          this.objUserAccount.designationID = "";
          this.selectedDesignation = "";
          this.objUserAccount.userRoleID = "";
          this.selectedUserRole = "";
          this.objUserAccount.companyID = "";
          this.selectedCompany = "";
          this.objUserAccount.isActive = false;
          this.objUserAccount.userName = "";
          this.objUserAccount.password = "";
          this.lstDepartment = null;
          this.isDisable = false; //----- Add By Nipuna Franciku
          this.isEditMode = false;

          //this.show = true;
          this.show3 = false;
          this.show2 = true;

        }
      }, err => {
       // alert('Save Unsuccessfull');
      });
  }

  reset() {
    this.objUserAccount.userID = "00000000-0000-0000-0000-000000000000";
    this.objUserAccount.name = ""
    this.objUserAccount.employeeNo = ""
    this.objUserAccount.departmentID = "";
    this.selectedDepartment = "";
    this.objUserAccount.email = "";
    this.objUserAccount.designationID = "";
    this.selectedDesignation = "";
    this.objUserAccount.userRoleID = "";
    this.selectedUserRole = "";
    this.objUserAccount.companyID = "";
    this.selectedCompany = "";
    this.objUserAccount.isActive = false;
    this.objUserAccount.userName = "";
    this.objUserAccount.password = "";
    this.lstDepartment = null;
    this.isDisable = false; //----- Add By Nipuna Franciku
    this.isEditMode = false;

    //this.show = true;
    this.show3 = false;
    this.show2 = true;

  }
}
