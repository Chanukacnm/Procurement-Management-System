import { Component, OnInit } from '@angular/core';
import { Purchaserequest } from '../../models/purchaserequest';
import { CategorymasterService} from '../../services/categorymaster.service';
import { ItemtypeService } from '../../services/itemtype.service';
import { PurchaserequestService } from '../../services/purchaserequest.service';
import { MakeService } from '../../services/make.service';
import { ModelService } from '../../services/model.service';
import { PriorityService } from '../../services/priority.service';
import { ApproverService } from '../../services/approver.service';
import { MatDialog, MatDialogRef, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material'
import { Inject } from '@angular/core';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Response } from 'selenium-webdriver/http';
import { DataGridTable } from '../../models/datagridtable';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ItemService } from '../../services/item.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Itemtype } from '../../models/itemtype';

@Component({
  selector: 'app-purchaserequest',
  templateUrl: './purchaserequest.component.html',
  styleUrls: ['./purchaserequest.component.scss']
})
export class PurchaserequestComponent implements OnInit {

  private objPurchaseRequest: Purchaserequest;
  private objPurchaseRequestDelete: Purchaserequest;
  private objuser: User;
  private objitemType: Itemtype;
  private lstCategory;
  private lstItemType;
  private lstMake;
  private lstModel;
  private lstPriority;
  private lstApprover;
  private lstItem;
   
  private selectedPriority = '';
  private selectedCategory = '';
  private selectedItemType = '';
  private selectedModel = '';
  private selectedMake = '';
  private selectedApprover = '';
  private selectedRequiredDate = '';
  private selectedlstItemDescription = '';

  private context;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private gridPurchaseRequest: DataGridTable;


  constructor(private categoryService: CategorymasterService,

              private itemService: ItemService,
              private itemTypeService: ItemtypeService,
              private makeService: MakeService,
              private modelService: ModelService,
              private priorityService: PriorityService,
              private approverService: ApproverService,
              private purchaseRequestService: PurchaserequestService,
              private datePipe: DatePipe,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<PurchaserequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)

  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {

    this.objPurchaseRequest = new Purchaserequest();
    this.objuser = new User();
    this.objitemType = new Itemtype();
    this.objPurchaseRequest.requestTitle = "";
    
    this.objPurchaseRequest.requestedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.objPurchaseRequest.updatedRequestedDateTime = "";
    this.objPurchaseRequest.assetCode = "";
    
    this.objPurchaseRequest.remark = "";
    this.objPurchaseRequest.isReplaceble = false;
    this.objPurchaseRequest.isIssued = false;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objPurchaseRequest.requestedUserID = UserDet.userId;
    this.objPurchaseRequest.departmentID = UserDet.departmentId;

    this.objuser.userID = UserDet.userId;
    this.objuser.departmentID = UserDet.departmentId;
    this.objPurchaseRequest.userID = UserDet.userId; //Add by Nipuna Francisku

    
    //  /*"D0F0E34B-7212-4BC3-A23A-2F05B2B9BC27" //n*/*/eed to be edited*/
    ////this.objPurchaseRequest.requestedUserID = "320DEDA1-9928-4C44-98E0-FCD37ECBFDEA" //need to be edited

  this.priorityService.getpriorityList().subscribe(response => {
      this.lstPriority = response;
    }, err => {
      //alert('in-Error - Priority');
    });

   this.categoryService.getcategoryMasterList().subscribe(response => {
      this.lstCategory = response;
    }, err => {
     // alert('in-Error - Category');
    });

    //this.itemTypeService.getItemTypeList().subscribe(response => {
    //  this.lstItemType = response;
    //}, err => {
    //  //alert('in-Error - Itemtype');
    //  });


    //this.makeService.getMakeList().subscribe(response => {
    //  this.lstMake = response;
    //}, err => {
    //  //alert('in-Error - Make');
    //});

    //this.modelService.getModelList().subscribe(response => {
    //  this.lstModel = response;
    //}, err => {
    //  //alert('in-Error - Model');

    //});

    this.approverService.getapproverList().subscribe(response => {
      this.lstApprover = response;
    }, err => {
      //alert('in-Error - Approver');
      });

    //this.itemService.getitemList().subscribe(response => {
    //  this.lstItem = response;
    //}, err => {
    //  //alert('in-Error - Item Description');
    //});

    //this.purchaseRequestService.getpurchaseRequestList().subscribe(response => {  //cmd by Nipuna
    console.log("qqq=>", this.objPurchaseRequest);
    this.purchaseRequestService.getpurchaseRequestList(this.objPurchaseRequest).subscribe(response => {
     
      if (response) {
        this.gridPurchaseRequest = new DataGridTable(response.rowSelection, response.enableSorting, response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridPurchaseRequest(this.gridPurchaseRequest);

      }
    }, err => {
      alert('in-Error aa');
    });

    this.objPurchaseRequest.noOfUnits = null;
    this.objPurchaseRequest.requiredDate = "";

  }

  CreateGridPurchaseRequest(gridPurchaseRequest: DataGridTable) {


    this.columnDefs = gridPurchaseRequest.dataGridColumns;
    this.rowData = gridPurchaseRequest.dataGridRows;


    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });

    //-------------- Nipuna Francisku --- Color change ------------

    this.columnDefs.push({
      headerName: 'Status',
      field: 'Status',
      width: 90, suppressMenu: true, lockPosition: true,
      cellStyle: function (params) {
        if (params.data.Status === "Pending") {
          return { color: 'Black', backgroundColor: '#ffa500' };
        }
        else if (params.data.Status === "Approved") {
          return { color: 'Black', backgroundColor: '#aaffaa' }; 
        }
        else if (params.data.Status === "Rejected") {
          return { color: 'Black', backgroundColor: '#ff3d3d' };
        }
        else if (params.data.Status === "Issued") {
          return { color: 'Black', backgroundColor: '#efcdcd' };
        }
      }
    });
	 //---------------------------------------------------------------

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 140, suppressMenu: true
    //});
  }

  //columnDefs = this.purchaseRequestService.getpurchaseRequestcolumnDefs();
  //rowData = this.purchaseRequestService.getpurchaseRequestRowData();

  PriorityChanged(objPriority) {
    this.selectedPriority = objPriority;
  }

  CategoryChanged(objCategory) {

    this.selectedCategory = objCategory;

    this.lstModel = null;
    this.lstMake = null;
    this.lstItemType = null;
    this.lstItem = null;
   

    this.objPurchaseRequest.itemTypeID = "00000000-0000-0000-0000-000000000000";
    

    //this.objitemType.categoryID = this.selectedCategory;
    this.itemTypeService.getSpecitemtypemasterList(this.objPurchaseRequest)
      .subscribe(Response => {
        this.lstItemType = Response.resultObject;
        console.log("cccc=>", this.lstItemType);

      }, err => {
        //alert('Make List Error');
      });
  }

  ItemTypeChanged(objItemType) {
    this.selectedItemType = objItemType;

    console.log("aaaaaaaaaaaaaaaaa", this.objPurchaseRequest);

    this.lstMake = null;
    this.lstItem = null;
    this.lstModel = null;
   

    this.isEditMode = false;

    //this.objPurchaseRequest.makeID = "00000000-0000-0000-0000-000000000000";
    this.objPurchaseRequest.itemID = "00000000-0000-0000-0000-000000000000";
    //this.objPurchaseRequest.modelID = "00000000-0000-0000-0000-000000000000";
    

    this.itemService.getSpecIemList(this.objPurchaseRequest)
      .subscribe(Response => {
        this.lstItem = Response.resultObject;
        console.log("vvvv=>", this.lstItem);

      }, err => {

      });


    this.makeService.getSpecSecondMakeList(this.objPurchaseRequest)
      .subscribe(response => {
        this.lstMake = response.resultObject;
        console.log("zxczv=>", this.lstMake);
      }, err => {
        
      });
    
  
  }

  ModelChanged(objModel) {
    this.selectedModel = objModel;
  }

  MakeChanged(objModel) {
    this.selectedMake = objModel;

    this.lstModel = null;

    //this.objPurchaseRequest.modelID = "00000000-0000-0000-0000-000000000000";
    
    
     
   
    this.modelService.getSpecModelList(this.objPurchaseRequest)
      .subscribe(Response => {

        this.lstModel = Response.resultObject;
        
      }, err => {

      });

  }

  ApproverChanged(objApprover) {
    this.selectedApprover=  objApprover;
  }

  ItemDescriptionChanged(objItem) {
    this.selectedlstItemDescription = objItem;
    console.log("itemdesc", this.selectedlstItemDescription);
  }
  


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  
  


  onReject(): void {
    this.dialogRef.close(this.data);
  }

  GridEditCellClicked(node) {

     this.isEditMode = true;

   
   
    console.log("aaaa", node.data);
    this.objPurchaseRequest.itemRequestID = node.data.ItemRequestID;
    this.objPurchaseRequest.requestTitle = node.data.RequestTitle;
    this.objPurchaseRequest.approverID = node.data.ApproverID;
    this.selectedApprover = node.data.ApproverID;
    this.objPurchaseRequest.assetCode = node.data.AssetCode;
    this.objPurchaseRequest.isReplaceble = node.data.IsReplaceble;
    this.objPurchaseRequest.categoryID = node.data.CategoryID;
    this.selectedCategory = node.data.CategoryID;
    this.objPurchaseRequest.itemID = node.data.ItemID;
    this.selectedlstItemDescription = node.data.ItemID;
    this.objPurchaseRequest.itemTypeID = node.data.ItemTypeID;
    this.selectedItemType = node.data.ItemTypeID;
    this.objPurchaseRequest.makeID = node.data.MakeID;
    this.selectedMake = node.data.MakeID;
    this.objPurchaseRequest.modelID = node.data.ModelID;
    this.selectedModel = node.data.ModelID;
    this.objPurchaseRequest.noOfUnits = node.data.NoOfUnits;
    this.objPurchaseRequest.priorityID = node.data.PriorityID;
    this.selectedPriority = node.data.PriorityID;
    this.objPurchaseRequest.remark = node.data.Remark;
    this.objPurchaseRequest.isApproved = node.data.IsApproved;
    this.objPurchaseRequest.isRejected = node.data.IsRejected;
    this.objPurchaseRequest.approvedDateTime = node.data.ApprovedDateTime;
    this.objPurchaseRequest.approvalComment = node.data.ApprovalComment;
    this.objPurchaseRequest.requestedUserID = node.data.RequestedUserId;
    this.objPurchaseRequest.departmentID = node.data.DepartmentId;
    this.objPurchaseRequest.requestedUserID = node.data.RequestedUserID;

    var mydaterequired = moment(node.data.RequiredDate, 'MM/DD/YYYY');
    this.objPurchaseRequest.requiredDate = (moment(mydaterequired).format('YYYY-MM-DD'));
    console.log(moment(mydaterequired).format('YYYY-MM-DD'));

    var mydaterequested = moment(node.data.RequestedDateTime, "MM/DD/YYYY HH:mm A");
    this.objPurchaseRequest.requestedDateTime = (moment(mydaterequested).format('YYYY-MM-DD HH:mm'));
    console.log(moment(mydaterequested).format('YYYY-MM-DD HH:mm'));

    this.objPurchaseRequest.updatedRequestedDateTime = node.data.UpdatedRequestedDateTime;
    this.objPurchaseRequest.approverName = node.data.ApproverName;
    this.objPurchaseRequest.departmentName = node.data.DepartmentName;
    this.objPurchaseRequest.categoryName = node.data.CategoryName;
    this.objPurchaseRequest.itemDescription = node.data.ItemDescription;
    this.objPurchaseRequest.itemTypeName = node.data.ItemTypeName;
    this.objPurchaseRequest.makeName = node.data.MakeName;
    this.objPurchaseRequest.modelName = node.data.ModelName;
    this.objPurchaseRequest.priorityLevelName = node.data.PriorityName;
    this.objPurchaseRequest.requestedUserName = node.data.RequestedUserName;
    this.objPurchaseRequest.departmentID = node.data.DepartmentID;

    this.itemTypeService.getSpecitemtypemasterList(this.objPurchaseRequest)
      .subscribe(Response => {
        this.lstItemType = Response.resultObject;
        console.log("cccc=>", this.lstItemType);

      }, err => {
        //alert('Make List Error');
      });


    this.itemService.getSpecIemList(this.objPurchaseRequest)
      .subscribe(Response => {
        this.lstItem = Response.resultObject;
        console.log("vvvv=>", this.lstItem);

      }, err => {

      });

    this.makeService.getSpecSecondMakeList(this.objPurchaseRequest)
      .subscribe(response => {
        this.lstMake = response.resultObject;
        console.log("cccc=>", this.lstMake);
      }, err => {

      });

    this.modelService.getSpecModelList(this.objPurchaseRequest)
      .subscribe(Response => {

        this.lstModel = Response.resultObject;

      }, err => {

      });


  }

  GridDeleteCellClicked(node) {
    this.objPurchaseRequestDelete = node.data;
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
        this.DeletePurchaseRequest(this.objPurchaseRequestDelete)
      }
    });

  }

  DeletePurchaseRequest(objPurchaseRequestDelete) {
    this.purchaseRequestService.deletePurchaseRequestList(objPurchaseRequestDelete)
      .subscribe(response => {

        alert('deleted');

      }, err => {
        alert('delete error');
      });

  }

  SavePurchaseRequest() {
   
    console.log("Save object",this.objPurchaseRequest);
    if (this.isEditMode == true) {
      this.objPurchaseRequest.updatedRequestedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
    }
    else {
      this.objPurchaseRequest.requestedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
    };

    if (this.selectedCategory == "" || this.selectedItemType == "" || this.selectedlstItemDescription == "" || this.selectedPriority == "" ||
      this.objPurchaseRequest.requiredDate == "" || this.objPurchaseRequest.noOfUnits == 0 || this.objPurchaseRequest.requestTitle =="") {
      

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });
      return false;
    }

    this.purchaseRequestService.savePurchaseRequest(this.objPurchaseRequest, this.objuser, this.isEditMode)
      .subscribe(response => {

        console.log("aaaaaaaaaaaaaaaa",response);

        if (!this.isEditMode) {
          
          //alert('Request has been Successfully Submitted');
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

          this.gridPurchaseRequest = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridPurchaseRequest(this.gridPurchaseRequest);

          Swal.fire({
            icon: 'success',
            text: 'Request has been Successfully Submitted',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objPurchaseRequest.itemRequestID = "00000000-0000-0000-0000-000000000000";
          this.objPurchaseRequest.requestTitle = "";
          this.objPurchaseRequest.categoryID = "";
          this.selectedCategory = "";
          this.objPurchaseRequest.makeID = "";
          this.selectedMake = "";
          this.lstModel = null;
          this.lstMake = null;
          this.lstItemType = null;
          this.lstItem = null;
          this.objPurchaseRequest.modelID = "";
          this.selectedModel = "";
          this.objPurchaseRequest.itemTypeID = "";
          this.selectedItemType = "";
          this.objPurchaseRequest.itemID = "";
          this.selectedlstItemDescription = "";
          this.objPurchaseRequest.noOfUnits = null;
          this.objPurchaseRequest.priorityID = "";
          this.selectedPriority = "";
          this.objPurchaseRequest.requestedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
          this.objPurchaseRequest.requiredDate = "";
          this.objPurchaseRequest.isReplaceble = false;
          this.objPurchaseRequest.approverID = "";
          this.selectedApprover = "";
          this.objPurchaseRequest.remark = "";
          this.objPurchaseRequest.approvedDateTime = null;
          this.objPurchaseRequest.approverName = "";

          this.isEditMode = false;
        }
        else {

          
          //alert('Request has been Successfully Updated');

          var result = response.resultObject;

          this.gridPurchaseRequest = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridPurchaseRequest(this.gridPurchaseRequest);

          Swal.fire({
            icon: 'success',
            text: 'Request has been Successfully Updated',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          this.objPurchaseRequest.itemRequestID = "00000000-0000-0000-0000-000000000000";
          this.objPurchaseRequest.requestTitle = "";
          this.objPurchaseRequest.categoryID = "";
          this.selectedCategory = "";
          this.objPurchaseRequest.makeID = "";
          this.selectedMake = "";
          this.objPurchaseRequest.modelID = "";
          this.selectedModel = "";
          this.objPurchaseRequest.itemTypeID = "";
          this.selectedItemType = "";
          this.objPurchaseRequest.itemID = "";
          this.selectedlstItemDescription = "";
          this.objPurchaseRequest.noOfUnits = null;
          this.objPurchaseRequest.priorityID = "";
          this.selectedPriority = "";
          this.objPurchaseRequest.requestedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
          this.objPurchaseRequest.requiredDate = "";
          this.objPurchaseRequest.isReplaceble = false;
          this.objPurchaseRequest.approverID = "";
          this.selectedApprover = "";
          this.objPurchaseRequest.remark = "";
          this.objPurchaseRequest.approvedDateTime = null;
          this.objPurchaseRequest.approverName = "";

          this.lstModel = null;
          this.lstMake = null;
          this.lstItemType = null;
          this.lstItem = null;

          this.isEditMode = false;

        }  
      }, err => {
        //alert('Requested Unsuccessfull');
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
    this.objPurchaseRequest.itemRequestID = "00000000-0000-0000-0000-000000000000";
    this.objPurchaseRequest.requestTitle = "";
    this.objPurchaseRequest.categoryID = "";
    this.selectedCategory = "";
    this.objPurchaseRequest.makeID = "";
    this.selectedMake = "";
    this.objPurchaseRequest.modelID = "";
    this.selectedModel = "";
    this.objPurchaseRequest.itemTypeID = "";
    this.selectedItemType = "";
    this.objPurchaseRequest.itemID = "";
    this.selectedlstItemDescription = "";
    this.objPurchaseRequest.noOfUnits = null;
    this.objPurchaseRequest.priorityID = "";
    this.selectedPriority = "";
    this.objPurchaseRequest.requestedDateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.objPurchaseRequest.requiredDate = "";
    this.objPurchaseRequest.isReplaceble = false;
    this.objPurchaseRequest.approverID = "";
    this.selectedApprover = "";
    this.objPurchaseRequest.remark = "";
    this.objPurchaseRequest.approvedDateTime = null;
    this.objPurchaseRequest.approverName = "";

    this.isEditMode = false;

    this.lstModel = null;
    this.lstMake = null;
    this.lstItemType = null;
    this.lstItem = null;
    

    //this.priorityService.getpriorityList().subscribe(response => {
    //  this.lstPriority = response;
    //}, err => {
    //  //alert('in-Error - Priority');
    //});

    //this.categoryService.getcategoryMasterList().subscribe(response => {
    //  this.lstCategory = response;
    //}, err => {
    //  // alert('in-Error - Category');
    //});


   

  }




}

