import { Component, OnInit } from '@angular/core';
import { Approvalflowmanagement } from '../../models/approvalflowmanagement';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ApprovalflowmanagementService } from '../../services/approvalflowmanagement.service';
import { UserroleService } from '../../services/userrole.service';
import { ApprovalpatterntypeService } from '../../services/approvalpatterntype.service';
import { DataGridTable } from '../../models/datagridtable';
import { GridApi } from 'ag-grid-community';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { DesignationService } from '../../services/designation.service';


@Component({
  selector: 'app-approvalflowmanagement',
  templateUrl: './approvalflowmanagement.component.html',
  styleUrls: ['./approvalflowmanagement.component.scss']
})
export class ApprovalflowmanagementComponent implements OnInit { 

  private objApprovalflowmanagement: Approvalflowmanagement;
  private objDelApprovalFlowManage: Approvalflowmanagement;
  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private lstApprovalflowmanagement;
  private lstUserRole;
  private lstDesignation;
  private lstApprovalpatterntype;
  private selectedApprovalPatternType = '';
  private selectedUserRole = '';
  private selectedDesignation = '';
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private gridApprovalFlowManagement: DataGridTable;
  public show2: boolean = false;
  public show: boolean = true;

  constructor(private approvalFlowManagementService: ApprovalflowmanagementService, private designationService: DesignationService, private userRoleService: UserroleService, private approvalpatterntypeService: ApprovalpatterntypeService, public dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {

    this.objApprovalflowmanagement = new Approvalflowmanagement();
    this.objApprovalflowmanagement.approvalSequenceNo = "";

    this.approvalpatterntypeService.getApprovalPattternTypeList().subscribe(response => {
      this.lstApprovalpatterntype = response;
    }, err => {


     
      //alert('in-Error - Approval Pattern Type');
    });

    this.designationService.getdesignationList().subscribe(response => {
      this.lstDesignation = response;

      //console.log("qqq=>", this.lstDesignation);
    }, err => {
      //alert('in-Error - Designation');
    });

    //this.userRoleService.getuserRoleList().subscribe(response => {
    //  this.lstUserRole = response;
    //}, err => {
    //  //alert('in-Error - User Role');
    //});

    this.approvalFlowManagementService.getApprovalFlowMangementGrid().subscribe(response => {
      if (response) {
        this.gridApprovalFlowManagement = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit,  response.dataGridColumns, response.dataGridRows);
        this.CreateGridApprovalFlowManage(this.gridApprovalFlowManagement);
      }
    })


  }

  CreateGridApprovalFlowManage(gridApprovalFlowManagement: DataGridTable) {
    this.columnDefs = gridApprovalFlowManagement.dataGridColumns;
    this.rowData = gridApprovalFlowManagement.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 90, suppressMenu: true, lockPosition: true,
    });

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
    //});
  }

  ApprovalPatternTypeChanged(objApprovalPatternType) {
    //this.objApprovalflowmanagement.approvalPatternTypeID = this.selectedApprovalPatternType;
    this.selectedApprovalPatternType = objApprovalPatternType;
  }

  //UserRoleChanged(objUserRole) {
  //  //this.objApprovalflowmanagement.userRoleID = this.selectedUserRole;
  //  this.selectedUserRole = objUserRole;
  //}

  DesignationChanged(objDesignation) {
    this.selectedDesignation = objDesignation;
    //this.objUserAccount.designationID = this.selectedDesignation;
  }
  

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

  }

  SaveApprovalFlowManage() {

    this.approvalFlowManagementService.SaveApprovalFlowManage(this.objApprovalflowmanagement, this.isEditMode)
      .subscribe(response => {
        if (!this.isEditMode) {

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'
  
          })

          this.approvalFlowManagementService.getApprovalFlowMangementGrid().subscribe(response => {
            if (response) {
              this.gridApprovalFlowManagement = new DataGridTable(response.rowSelection, response.enableSorting,
                response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
              this.CreateGridApprovalFlowManage(this.gridApprovalFlowManagement);
            }
          })

          //this.objApprovalflowmanagement.approvalSequenceNo = "";
         //this.objApprovalflowmanagement.approvalFlowManagementID = "00000000 - 0000 - 0000 - 0000 - 000000000000";
          this.objApprovalflowmanagement.approvalPatternTypeID = "";
          this.objApprovalflowmanagement.approvalSequenceNo = "";
          //this.objApprovalflowmanagement.userRoleID = "";
          this.objApprovalflowmanagement.designationID = "";
          

        }
        else {

          this.approvalFlowManagementService.getApprovalFlowMangementGrid().subscribe(response => {
            if (response) {
              this.gridApprovalFlowManagement = new DataGridTable(response.rowSelection, response.enableSorting,
                response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
              this.CreateGridApprovalFlowManage(this.gridApprovalFlowManagement);
            }
          });


          Swal.fire({
            icon: 'success',
            text: 'The record has been Updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objApprovalflowmanagement.approvalFlowManagementID = "00000000-0000-0000-0000-000000000000";
          this.objApprovalflowmanagement.approvalPatternTypeID = "";
          this.objApprovalflowmanagement.approvalSequenceNo = "";
          //this.objApprovalflowmanagement.userRoleID = "";
          this.objApprovalflowmanagement.designationID = "";

          this.isEditMode = false;

          this.show2 = false;
          this.show = true;

          //alert('Records have been updated successfully');
        }  
      }, err => {
        //alert('Save Unsuccessfull');
      });
  }

  GridDeleteCellClicked(node, Header) {
    this.objDelApprovalFlowManage = new Approvalflowmanagement();
    this.objDelApprovalFlowManage = node.data;
    console.log('bbbc=>', this.objDelApprovalFlowManage);

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
        this.DeleteApprovalFlowManagement(this.objDelApprovalFlowManage);
      }
    });

  }

  DeleteApprovalFlowManagement(objDelApprovalFlowManage) {
    this.approvalFlowManagementService.deleteApprovalFlowManage(objDelApprovalFlowManage)
      .subscribe(Response => {
        alert('Deleted Successfully');
      }, err => {
        alert('Deleted Unsuccessful');
      });
  }

  GridEditCellClicked(node, Header) {
    this.isEditMode = true;
    this.show2 = true;
    this.show = false;
    console.log('data =>', node.data);
    this.objApprovalflowmanagement.approvalPatternTypeID = node.data.ApprovalPatternTypeID;
    this.objApprovalflowmanagement.approvalSequenceNo = node.data.ApprovalSequenceNo;
    //this.objApprovalflowmanagement.userRoleID = node.data.UserRoleID;
    this.objApprovalflowmanagement.designationID = node.data.DesignationID;
    this.objApprovalflowmanagement.approvalFlowManagementID = node.data.ApprovalFlowManagementID;
    
  }



  onSearch() {

  }

  onNEw() {

  }

  reset() {
    this.objApprovalflowmanagement.approvalSequenceNo = "";
    this.objApprovalflowmanagement.approvalFlowManagementID = "00000000 - 0000 - 0000 - 0000 - 000000000000";
    this.objApprovalflowmanagement.approvalPatternTypeID = "";
    this.objApprovalflowmanagement.approvalSequenceNo = "";
    //this.objApprovalflowmanagement.userRoleID = "";
    this.objApprovalflowmanagement.designationID = "";


    this.show2 = false;
    this.show = true;


  }
  
}
