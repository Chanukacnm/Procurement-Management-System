import { Component, OnInit } from '@angular/core';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { CancelbuttonRenderer } from '../renderer/button-renderer/cancelbutton-renderer.component';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { PurchaserequestComponent } from '../purchaserequest/purchaserequest.component';
import { SuppliermasterComponent } from '../suppliermaster/suppliermaster.component';
import { RfqpopupComponent } from '../rfqpopup/rfqpopup.component';
import { AgCheckbox, AgRadioButton } from 'ag-grid-community';
import { variable } from '@angular/compiler/src/output/output_ast';
import { QuotationrequestService } from '../../services/quotationrequest.service';
import { Quotationerequestheader } from '../../models/quotationerequestheader';
import { Quotationrequestdetails } from '../../models/quotationrequestdetails';
import { DataGridTable } from '../../models/datagridtable';
import { SuppliermasterService } from '../../services/suppliermaster.service';
import { ItemService } from '../../services/item.service';
import { MeasurementUnitsService } from '../../services/measurementunits.service';
import { MakeService } from '../../services/make.service';
import { SupplierregistereditemsService} from '../../services/supplierregistereditems.service';
import { ModelService } from '../../services/model.service';
import { QuotationrequestheaderService } from '../../services/quotationrequestheader.service';
import * as moment from 'moment';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { Make } from '../../models/make';
import { Model } from '../../models/model';
import { Suppliermaster } from '../../models/suppliermaster';
import { Item } from '../../models/item';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-quotationrequest',
  templateUrl: './quotationrequest.component.html',
  styleUrls: ['./quotationrequest.component.scss']
})
export class QuotationrequestComponent implements OnInit {

  private objQuoationRequestHeader: Quotationerequestheader;
  private objQuoationRequestDetails: Quotationrequestdetails;
  private objDelQuoationRequestDetails: Quotationrequestdetails;
  private objMake: Make;
  private objItem: Item;
  private objsupplier: Suppliermaster;

  private context;
  private frameworkComponents;
  private lstSupplier;
  private lstItems;
  private lstMake = [];
  private lstModel = [];
  private lstMeasurementUnits;
  private selectedSupplier = '';
  private selectedItems = '';
  private selectedMeasurementunit = '';
  private selectedMake = '';
  private selectedModel = '';
  private isEditMode = false;
  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  private gridOptions;
  private RowStyle;
  private quotationRequestHeader;
  private quotationRequestHeaderData;
  private quotationRequestDetails;
  private quotationRequestDetailsRowData;
  private gridQuotationRequestHeader: DataGridTable;
  private gridQuotationRequestDetails: DataGridTable;

  private itemID = '';
  private quantity ;
  private measurementUnitID = '';
  private modelID = '';
  private makeID = '';

  public show: boolean = false;
   
  
 
  

  constructor(public dialog: MatDialog, private quotationrequestHeaderService: QuotationrequestheaderService,
    private supplierService: SuppliermasterService, private itemService: ItemService, private measurementUnitService: MeasurementUnitsService,
    private makeService: MakeService, private modelService: ModelService, private supplierItem: SupplierregistereditemsService) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      cancelbuttonRenderer: CancelbuttonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  ngOnInit() {
    this.objQuoationRequestHeader = new Quotationerequestheader();
    this.objQuoationRequestHeader.quotationRequestDetails = [];
    this.objQuoationRequestHeader.requiredDate = "";
    this.objQuoationRequestHeader.quotationRequestedDate = (moment().format("MM/DD/YYYY HH:mm"));
    this.objQuoationRequestHeader.quotationRequestStatusID = "1";
    this.objQuoationRequestHeader.quotationNumber = "0001";
    this.objQuoationRequestHeader.isEnteringCompleted = false;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objQuoationRequestHeader.userID = UserDet.userId;


    //getRowStyle : (params) => {
    //  if (this.objQuoationRequestHeader.isCanceled = false) {
    //    return { 'background-color': "black" };
    //  }
    //}

    //this.gridOptions.getRowStyle = function (params) {
    //  if (this.objQuoationRequestHeader.isCanceled = false) {
    //    return { background: 'blue' }
    //  }
    //}

    //function changeRowColor(params) {

    //  if (this.objQuoationRequestHeader.isCanceled = false) {
    //    return { 'background-color': "black" };
    //  }

    //}
    

    this.supplierService.getSupplierMasterList().subscribe(response => {
      this.lstSupplier = response;
    }, err => {
      alert('in-Error - Supplier');
    });

    //this.itemService.getitemList().subscribe(response => {
    //  this.lstItems = response;
    //  console.log(this.lstItems);
    //}, err => {
    //  alert('in-Error - Items');
    //});

    this.measurementUnitService.getMeasurementUnitsList().subscribe(response => {
      this.lstMeasurementUnits = response;      
    }, err => {
      alert('in-Error - Measurement Units');
    });

    //this.makeService.getMakeList().subscribe(response => {
    //  this.lstMake = response;      
    //}, err => {
    //  alert('in-Error - Make');
    //});


    //this.modelService.getModelList().subscribe(response => {
    //  this.lstModel = response;
    //}, err => {
    //  alert('in-Error - Model');
    //});

    this.quotationrequestHeaderService.getQuotationRequestHeaderGrid().subscribe(response => {
      if (response) {
        this.gridQuotationRequestHeader = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationRequestHeader(this.gridQuotationRequestHeader);
      } 
    })


    this.quotationrequestHeaderService.getQuotationRequestDetailsGrid().subscribe(response => {
      console.log("qqq",response);
      if (response) {
        this.gridQuotationRequestDetails = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationRequestDetails(this.gridQuotationRequestDetails);
      }
    })
    

  }

  CreateGridQuotationRequestHeader(gridQuotationRequestHeader: DataGridTable) {
    this.quotationRequestHeader = gridQuotationRequestHeader.dataGridColumns;
    this.quotationRequestHeaderData = gridQuotationRequestHeader.dataGridRows;

    this.quotationRequestHeader.push({
      headerName: 'Cancel Quotation Request',
      cellRenderer:  "cancelbuttonRenderer", width: 182, suppressMenu: true
    });

//-------------- Nipuna Francisku --- Color change ------------

    this.quotationRequestHeader.push({
      headerName: 'Quotation Request Status',
      field: 'QuotationRequestStatus1',
      width: 180, suppressMenu: true, lockPosition: true,
      cellStyle: function (params) {
        if (params.data.QuotationRequestStatus1 === "Pending") {
          return { color: 'Black', backgroundColor: '#ffa500' };
        }
        else if (params.data.QuotationRequestStatus1 === "Approved") {
          return { color: 'Black', backgroundColor: '#aaffaa' };
        }
        else if (params.data.QuotationRequestStatus1 === "Rejected") {
          return { color: 'Black', backgroundColor: '#ff3d3d' };
        }
        else if (params.data.QuotationRequestStatus1 === "Canceled") {
          return { color: 'Black', backgroundColor: '#efcdcd' };
        }
      }
    });
	 //--------------------------------------------------------------------------

    //for (var j = 0; j < this.quotationRequestHeaderData.length; j++) {
    //  if ((this.quotationRequestHeaderData[j].QuotationRequestStatusID == 1)) {
    //    console.log("aaaa=>", this.quotationRequestHeaderData);
    //    //this.quotationRequestHeaderData[j].cellRenderer = "cancelbuttonRenderer";
    //    //this.quotationRequestHeader[13].cellRenderer = "cancelbuttonRenderer";
    //  }

    //}
    
    //this.quotationRequestHeader.push({
    //  headerName: 'Cancel Quotation Request',
    //  cellRenderer: "cancelbuttonRenderer", width: 170, suppressMenu: true
    //});

    
  }

  CreateGridQuotationRequestDetails(gridQuotationRequestDetails: DataGridTable) {
    this.quotationRequestDetails = gridQuotationRequestDetails.dataGridColumns;

    
    this.quotationRequestDetails.push({
      headerName: 'Delete',
      cellRenderer: "deletebuttonRenderer", width: 90, suppressMenu: true
    });
  }

  


  SupplierChanged(objSupplier) {
    this.selectedSupplier = objSupplier;

    this.lstModel = null;
    this.selectedMeasurementunit = "";
    this.quantity = null;
    this.lstMake = null;
    this.lstItems = null;

    this.supplierItem.getSpecitemdescriptionList(this.objQuoationRequestHeader).subscribe(response => {
      this.lstItems = response.resultObject;

      console.log("item desctiptionlist", this.lstItems);
      
    }, err => {
      alert('in-Error - item');
      });

    
  }

  itemchanged(objitemchanged) {
    
    this.selectedMeasurementunit = "";
    this.quantity = null;

    this.lstMake = null;
    this.selectedMake = "";
    this.lstModel = null;

    this.objItem = new Item();

    this.objItem.itemID = objitemchanged;

    this.makeService.getSpecMakeAllList(this.objItem).subscribe(response => {
      this.lstMake = response.resultObject;

    }, err => {
      alert('in-Error - item');
    });


  }


  

  MakeChanged(objMakeChange) {

    console.log("aaaaaaaaaaaaaaaaaaaa", objMakeChange);

    this.lstModel = null;
    this.selectedModel = "";

    this.objMake = new Make();
    
    this.objMake.makeID = objMakeChange;

    this.modelService.getSpecModelList2(this.objMake).subscribe(response => {
          this.lstModel = response.resultObject;

        }, err => {
          alert('in-Error - item');
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

  GridCancelCellClicked(node) {
    this.objQuoationRequestHeader = node.data;
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
      switch (result) {
        case true:
          console.log("Quotation Canceled");
          this.isEditMode = true;
          this.objQuoationRequestHeader.quotationRequestStatusID = "3";
          this.SaveQuotationRequest(this.objQuoationRequestHeader);
          break;

        case false:
          console.log("Quotation Not Canceled");
          Swal.fire({
            icon: 'error',
            text: 'Request has been Not Cancelled! ',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });
          break;

        default:
          Swal.fire({
            icon: 'error',
            text: 'Request has been Not Cancelled! ',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });
          console.log("Quotation Not Canceled");
      }

      //if (result = true) {
      //  console.log("Quotation Canceled");
      //  this.isEditMode = true;        
      //  this.objQuoationRequestHeader.quotationRequestStatusID = "3";        
      //  this.SaveQuotationRequest(this.objQuoationRequestHeader);
      //}
      //else {
      //  console.log("Quotation Not Canceled");
      //  this.objQuoationRequestHeader.quotationRequestStatusID = "1";
      //  this.SaveQuotationRequest(this.objQuoationRequestHeader);
      //}
    });
    
  }

  

  GridEditCellClicked(node, Header) { }

  GridDeleteCellClicked(node, Header) {
    //this.objDelQuoationRequestDetails = new Quotationrequestdetails();
    //this.objDelQuoationRequestDetails = node.data;
    //console.log("ccc=>", this.objDelQuoationRequestDetails);
    
    //var deletedRow = node.data;
    //this.gridApi2.updateRowData({ remove: [deletedRow] });
    //console.log("eeee=>", this.gridApi2.updateRowData);

    this.objDelQuoationRequestDetails = new Quotationrequestdetails();
    this.objDelQuoationRequestDetails = node.data;

    for (var i = 0; i < this.objQuoationRequestHeader.quotationRequestDetails.length; i++) {
      if (this.objQuoationRequestHeader.quotationRequestDetails[i] === this.objDelQuoationRequestDetails) {
        this.objQuoationRequestHeader.quotationRequestDetails.splice(i, 1);
        i = this.objQuoationRequestHeader.quotationRequestDetails.length;
        this.gridApi2.updateRowData({ remove: [this.objDelQuoationRequestDetails] });
      }
    }

    console.log("list=>", this.objQuoationRequestHeader.quotationRequestDetails )
  }

 
  AddQuotationRequestDetails() {

    console.log("1", this.selectedItems);
    console.log("2", this.selectedMeasurementunit);
    console.log("3", this.quantity);
    console.log("4", this.selectedMake);
    console.log("5", this.selectedModel);

    this.lstMake = [];
    this.lstModel = [];

    if (this.selectedItems == "" || this.selectedMeasurementunit == "" || this.quantity == null) {
      //alert('Please fill the mandatory fields');
      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23' 

      });
      return false;
    }

    this.objQuoationRequestDetails = new Quotationrequestdetails(); 
    //this.objQuoationRequestDetails.ItemID = this.selectedItems;
    
   

    for (var i = 0; i < this.lstItems.length; i++) {
      if (this.lstItems[i].itemID === this.selectedItems) {
        this.objQuoationRequestDetails.ItemID = this.lstItems[i].itemID;
        this.objQuoationRequestDetails.itemDescription = this.lstItems[i].itemDescription;
      }

    }

    this.objQuoationRequestDetails.Quantity = this.quantity;

    for (var p = 0; p < this.lstMeasurementUnits.length; p++) {
      if (this.lstMeasurementUnits[p].measurementUnitID === this.selectedMeasurementunit) {
        this.objQuoationRequestDetails.MeasurementUnitID = this.lstMeasurementUnits[p].measurementUnitID;
        this.objQuoationRequestDetails.measurementUnitName = this.lstMeasurementUnits[p].measurementUnitName;
        
      }
    }

    //this.objQuoationRequestDetails.MeasurementUnitID = this.selectedMeasurementunit;

    for (var q = 0; q < this.lstMake.length; q++) {
      if (this.lstMake[q].makeID === this.selectedMake) {
        this.objQuoationRequestDetails.MakeID = this.lstMake[q].makeID;
        this.objQuoationRequestDetails.makeName = this.lstMake[q].makeName;

        
      }
      
    }

    //this.objQuoationRequestDetails.MakeID = this.selectedMake;

    for (var r = 0; r < this.lstModel.length; r++) {
      if (this.lstModel[r].modelID === this.selectedModel) {
        this.objQuoationRequestDetails.ModelID = this.lstModel[r].modelID;
        this.objQuoationRequestDetails.modelName = this.lstModel[r].modelName;
        
      }
    }

    //this.objQuoationRequestDetails.ModelID = this.selectedModel;

    this.objQuoationRequestHeader.quotationRequestDetails.push(this.objQuoationRequestDetails);
    console.log("gg=>", this.objQuoationRequestHeader);
   


    if (this.quotationRequestDetailsRowData == null) {
      this.quotationRequestDetailsRowData = this.objQuoationRequestHeader.quotationRequestDetails;
    }
    else {
      this.gridApi2.setRowData([]);
      this.gridApi2.updateRowData({ add: this.quotationRequestDetailsRowData });
    }

    console.log("gg=>", this.quotationRequestDetailsRowData);
    //this.gridQuotationRequestDetails.dataGridRows = this.objQuoationRequestHeader.quotationRequestDetails; 
    this.gridApi2.redrawRows();

    this.selectedItems = "";
    this.quantity = null;
    this.selectedMeasurementunit = "";
    this.selectedMake = "";
    this.selectedModel = "";

    

  } 

  SaveQuotationRequest(objQuoationRequestHeader) {
    if (!(this.objQuoationRequestHeader.quotationRequestStatusID == "3")) {
      if (this.selectedSupplier == "" || this.objQuoationRequestHeader.quotationRequestDetails.length == 0 || this.objQuoationRequestHeader.requiredDate == "") {
        Swal.fire({

          icon: 'info',
          text: 'Please fill the mandatory fields',

          showCloseButton: true,
          showConfirmButton: true,

        });
        return false;
      }
    }
    
    
    this.quotationrequestHeaderService.saveQuotationRequestHeader(this.objQuoationRequestHeader, this.isEditMode)
      .subscribe(response => {
        if (!this.isEditMode) {
          Swal.fire({
            icon: 'success',
            text: 'Request has been Successfully Submitted',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });
          //alert('Request has been Successfully Submitted');
          var result = response.resultObject;

          this.gridQuotationRequestHeader = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridQuotationRequestHeader(this.gridQuotationRequestHeader);



          this.objQuoationRequestHeader.quotationRequestHeaderID = "00000000-0000-0000-0000-000000000000";
          this.objQuoationRequestHeader.supplierID = "";
          this.objQuoationRequestHeader.quotationRequestDetails = [];
          this.quotationRequestDetailsRowData = null;
          this.objQuoationRequestHeader.requiredDate = "";

          this.selectedSupplier = "";
          this.selectedItems = "";
          this.selectedMake = "";

          this.lstMake = null;
          this.lstModel = null;
          this.lstItems = null;

        }
        else {
          Swal.fire({
            icon: 'success',
            text: 'Request has been Successfully Canceled',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23',

          });

          var result = response.resultObject;

          this.gridQuotationRequestHeader = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridQuotationRequestHeader(this.gridQuotationRequestHeader);



          this.objQuoationRequestHeader.quotationRequestHeaderID = "00000000-0000-0000-0000-000000000000";
          this.objQuoationRequestHeader.supplierID = "";
          this.selectedSupplier = "";
          this.objQuoationRequestHeader.quotationRequestDetails = [];
          this.quotationRequestDetailsRowData = null;
          this.objQuoationRequestHeader.requiredDate = "";

        }

        
      }, err => {
        alert('Request Unsuccessfull');
        this.objQuoationRequestHeader.quotationRequestHeaderID = "00000000-0000-0000-0000-000000000000";
        this.objQuoationRequestHeader.supplierID = "";
        this.selectedSupplier = "";
        this.objQuoationRequestHeader.quotationRequestDetails = [];
        this.quotationRequestDetailsRowData = null;
        this.objQuoationRequestHeader.requiredDate = "";
      });
  }

  reset() {
    this.objQuoationRequestHeader.quotationRequestHeaderID = "00000000-0000-0000-0000-000000000000";
    this.objQuoationRequestHeader.supplierID = "";

    this.selectedSupplier = "";
    this.selectedMeasurementunit = "";
    this.selectedMake = "";
    this.selectedItems = "";
    this.selectedModel = 
    this.quantity = null;

    this.objQuoationRequestHeader.quotationRequestDetails = [];
    this.quotationRequestDetailsRowData = null;
    this.objQuoationRequestHeader.requiredDate = "";

    this.lstItems = null;
    this.lstModel = null;

  }


  //GridMoreDetailsCellClicked(rowIndex, Header) {
  //  // alert('MoreDetailsIndex :' + rowIndex + ',Header :' + Header);
  //  const dialogRef = this.dialog.open(PurchaserequestComponent, {
  //    width: '1500px',
  //    height: '550px ',
  //    position: {
  //      top: '80px',
  //      bottom: '',
  //      left: '220px',
  //      right: '30px'
  //    }
      
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed');

  //  });
  //  //}
  //}

  //GridRFQCellClicked() {
  //  const dialogRef = this.dialog.open(RfqpopupComponent, {
  //    width: '600px',
  //    height: '325px ',
  //    position: {
  //      top: '',
  //      bottom: '',
  //      left: '460px',
  //      right: ''
  //    }
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed');
  //  });
  //}


  //public getSelectedRows(event: any)
  //{     
  //  let rowsSelection = this.gridApi.getSelectedRows();
  //  //console.info(rowsSelection);
  //  var rowCount = event.api.getSelectedNodes().length;
  //  //console.info(rowsSelection);
  //  console.info('a',rowCount)
   
  //  if (event.api.getSelectedNodes(event).length == 1)
  //  {
  //    this.show = true;
  //    console.info('a', rowsSelection )
  //  }
  //  else
  //  {
  //    this.show = false;
  //  }
  //}

  //GridCheckCellClicked(rowIndex, Header, event:any) {

  //  //this.gridApi.forEachLeafNode((node) =>
  //  //{
  //  //  if (this.gridApi.getSelectedRows().length == '1') {
  //  //    this.show = true;
  //  //  }
  //  //  else {
  //  //    this.show = false;
  //  //  }

  //  //})
   
  //}
  
  //onAdd()  {

  //  let dialogRef = this.dialog.open(SuppliermasterComponent, {
  //    width: '1100px',
  //    height: '550px ',

  //    disableClose: false,
  //    hasBackdrop: true,
  //    backdropClass: '',
  //    position: {
  //      top: '80px',
  //      bottom: '',
  //      left: '220px',
  //      right: '30px'
  //    }
  //  });

  //}

}

