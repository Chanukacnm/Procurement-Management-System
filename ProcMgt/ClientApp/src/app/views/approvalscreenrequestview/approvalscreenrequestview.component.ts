import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Approvalscreen } from '../../models/approvalscreen';
import { ApprovalscreenComponent } from '../approvalscreen/approvalscreen.component';
import * as moment from 'moment';
import { PriorityService } from '../../services/priority.service';
import { CategorymasterService } from '../../services/categorymaster.service';
import { ItemtypeService } from '../../services/itemtype.service';
import { MakeService } from '../../services/make.service';
import { ModelService } from '../../services/model.service';
import { ApproverService } from '../../services/approver.service';
import { ItemService } from '../../services/item.service';


@Component({
  selector: 'app-approvalscreenrequestview',
  templateUrl: './approvalscreenrequestview.component.html',
  //template: '<span><button (click)="invokeParentMethod()" class="btn btn-block btn-link" >More Details</button></span>'
})
export class ApprovalscreenrequestviewComponent implements OnInit {
  private objApprovalScreen: Approvalscreen;
  private lstCategory;
  private lstItemType;
  private lstMake;
  private lstModel;
  private lstPriority;
  private lstApprover;
  private lstItemDescription;

  private selectedPriority = '';
  private selectedCategory = '';
  private selectedItemType = '';
  private selectedModel = '';
  private selectedMake = '';
  private selectedApprover = '';
  private selectedRequiredDate = '';
  private selectedItemDescription = '';


  constructor
    (
    private itemService: ItemService,
    private categorymasterService: CategorymasterService,
    private itemTypeService: ItemtypeService,
    private makeSerice: MakeService,
    private modelService: ModelService,
    private priorityService: PriorityService,
    private approverService: ApproverService,
    public dialogRef: MatDialogRef<ApprovalscreenrequestviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   

  }

  ngOnInit() {
    this.objApprovalScreen = new Approvalscreen();
    this.objApprovalScreen.itemRequestID = this.data.ItemRequestID;
    this.objApprovalScreen.requestTitle = this.data.RequestTitle;
    this.objApprovalScreen.approverID = this.data.ApproverID;
    this.objApprovalScreen.assetCode = this.data.AssetCode;
    this.objApprovalScreen.isReplaceble = this.data.IsReplaceble;
    this.objApprovalScreen.categoryID = this.data.CategoryID;
    this.objApprovalScreen.itemTypeID = this.data.ItemTypeID;
    this.objApprovalScreen.itemID = this.data.ItemID
    this.objApprovalScreen.makeID = this.data.MakeID;
    this.objApprovalScreen.modelID = this.data.ModelID;
    this.objApprovalScreen.noOfUnits = this.data.NoOfUnits;
    this.objApprovalScreen.priorityID = this.data.PriorityID;
    this.objApprovalScreen.remark = this.data.Remark;
    this.objApprovalScreen.isApproved = this.data.IsApproved;
    this.objApprovalScreen.isRejected = this.data.IsRejected;
    this.objApprovalScreen.approvedDateTime = this.data.ApprovedDateTime;
    this.objApprovalScreen.approvalComment = this.data.ApprovalComment;
    this.objApprovalScreen.requestedUserID = this.data.RequestedUserId;
    this.objApprovalScreen.departmentID = this.data.DepartmentId;
    this.objApprovalScreen.requestedDateTime = (moment(this.data.RequestedDateTime).format("MM/DD/YYYY HH:mm"))
    this.objApprovalScreen.updatedRequestedDateTime = (moment(this.data.UpdatedRequestedDateTime).format("YYYY-MM-DD HH:mm"));
    //this.objApprovalScreen.requiredDate = (moment(this.data.RequiredDate).format("MM/DD/YYYY "));

    var mydaterequired = moment(this.data.RequiredDate, 'MM/DD/YYYY ');
    this.objApprovalScreen.requiredDate = (moment(mydaterequired).format("YYYY-MM-DD"));
    console.log(moment(mydaterequired).format("YYYY-MM-DD"));

    //var mydaterequested = moment(this.data.RequestedDateTime, 'MM/DD/YYYY');
    //this.objApprovalScreen.requestedDateTime = (moment(mydaterequested).format("YYYY-MM-DD HH:mm"));
    //console.log(moment(mydaterequested).format("YYYY-MM-DD"));

    //var mydateupdated = moment(this.data.UpdatedRequestedDateTime, 'MM/DD/YYYY HH:mm');
    //this.objApprovalScreen.updatedRequestedDateTime = (moment(mydateupdated).format("YYYY-MM-DD HH:mm"));

    this.objApprovalScreen.categoryName = this.data.CategoryName;
    this.objApprovalScreen.itemDescription = this.data.ItemDescription;
    this.objApprovalScreen.makeName = this.data.MakeName;
    this.objApprovalScreen.priorityLevelName = this.data.PriorityLevelName;
    this.objApprovalScreen.itemTypeName = this.data.ItemTypeName;
    this.objApprovalScreen.modelName = this.data.ModelName;
    this.objApprovalScreen.approverName = this.data.ApproverName;
    this.objApprovalScreen.requestedUserName = this.data.RequestedUserName;
    this.objApprovalScreen.departmentName = this.data.DepartmentName;

   


    this.priorityService.getpriorityList().subscribe(response => {
      this.lstPriority = response;
    }, err => {
      //alert('in-Error - Priority');
      });

    this.categorymasterService.getcategoryMasterList().subscribe(response => {
      this.lstCategory = response;
    }, err => {
      //alert('in-Error - Category');
    });

    this.itemTypeService.getItemTypeList().subscribe(response => {
      this.lstItemType = response;
    }, err => {
      //alert('in-Error - Itemtype');
    });

    this.makeSerice.getMakeList().subscribe(response => {
      this.lstMake = response;
    }, err => {
      //alert('in-Error - Make');
    });

    this.modelService.getModelList().subscribe(response => {
      this.lstModel = response;
    }, err => {
      //alert('in-Error - Model');

    });

    this.approverService.getapproverList().subscribe(response => {
      this.lstApprover = response;
    }, err => {
      //alert('in-Error - Approver');
      });

    this.itemService.getitemList().subscribe(response => {
      this.lstItemDescription = response;
    }, err => {
      //alert('in-Error - Item Description');
    });

  }
  //public params: any;

  //agInit(params: any): void {
  //  this.params = params;
  //}

  //public invokeParentMethod() {
  //  this.params.context.componentParent.GridMoreDetailsCellClicked(this.params.node);

  //}

  //refresh(): boolean {
  //  return false;
  //}
  PriorityChanged(objPriority) {
    this.selectedPriority = objPriority;
  }

  CategoryChanged(objCategory) {
    this.selectedCategory = objCategory;
  }

  ItemTypeChanged(objItemType) {
    this.selectedItemType = objItemType;
  }

  ModelChanged(objModel) {
    this.selectedModel = objModel;
  }

  MakeChanged(objModel) {
    this.selectedMake = objModel;
  }

  ApproverChanged(objApprover) {
    this.selectedApprover = objApprover;
  }

  ItemDescriptionChanged(objItem) {
    this.selectedItemDescription = objItem;
  }

  onClose() {
    this.dialogRef.close();
  }
}
