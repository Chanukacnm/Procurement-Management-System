import { Component, OnInit } from '@angular/core';
import { Poheader } from '../../models/poheader';
import { Podetails } from '../../models/podetails';
import { Quotationerequestheader } from '../../models/quotationerequestheader';
import { Quotationrequestdetails } from '../../models/quotationrequestdetails';
import { PaymentmethodService } from '../../services/paymentmethod.service';
import { UseraccountService } from '../../services/useraccount.service';
import { RaisepobuttonRenderer } from '../renderer/button-renderer/raisepobutton-renderer.component';
import { RemovebuttonRenderer } from '../renderer/button-renderer/removebutton-renderer.component';
import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { SecondSelectionCheckboxRenderer } from '../renderer/button-renderer/second-selection-checkbox-renderer.component';
import { ThirdselectioncheckboxRenderer } from '../renderer/button-renderer/thirdselectioncheckbox-renderer.component';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { PurchaseorderService } from '../../services/purchaseorder.service';
import { DataGridTable } from '../../models/datagridtable';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { PoreportdataService } from '../../services/poreportdata.service';
import { Router } from "@angular/router";
import { PoreportComponent } from '../poreport/poreport.component';



 



@Component({  
  selector: 'app-purchaseorder',     
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.scss']
})
export class PurchaseorderComponent implements OnInit {
  private objPoHeader: Poheader;
  private objPoDetails: Podetails;
  private objQuotationRequestHeader: Quotationerequestheader;
  private objQuotationRequestDetails: Quotationrequestdetails;
  private quotationDetailsGridData;


  private lstPaymentMethod;
  private selectedPaymentMethod = '';

 
  private quotationListgridApi;
  private quotationDeatilsListgridApi;
  private gridApi;
  private gridOptions;

  private isEditMode = false;


  private quotationListgridColumnApi;
  private quotationDeatilsListgridColumnApi;
  private QuotationListColumnDefs;
  private QuotationListRowData;
  private QuotationDeatilsColumnDefs;
  private QuotationDeatilsRowData;
  private gridQuotationList: DataGridTable;
  private gridquotationDeatils: DataGridTable;

  public show: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  private context;
  private frameworkComponents;
  
  //PodetailList[]
  private pOHeaderID = '';
  private itemID = '';
  private unitPrice;
  private qty;
  private totalAmount;
  private discountAmount


  //quotationheader
  private requiredDate= '';
  private quotationNumber = '';

  dataObj: any;
 

 

 
 


  constructor(public dialog: MatDialog, private purchaseorderService: PurchaseorderService,
    private paymentMethodService: PaymentmethodService, private useraccountService: UseraccountService, private poreportdataservice: PoreportdataService, private router:Router  ) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      raisepobuttonRenderer: RaisepobuttonRenderer,
      removebuttonRenderer: RemovebuttonRenderer,

      //checkboxRenderer: CheckboxRenderer,
      //secondCheckboxRenderer: SecondSelectionCheckboxRenderer,
      //thirdcheckboxRenderer: ThirdselectioncheckboxRenderer,
      buttonRenderer: ButtonRenderer,
      //deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  



  ngOnInit() {
    this.objPoHeader = new Poheader();
    this.objPoHeader.podetail = [];
    //this.objPoHeader.quotationRequestDetails = [];
    ////this.objPoHeader.quotationRequestHeader = [];
    this.objPoHeader.poNumber = "";
    this.objPoHeader.actualDeliveryDate = "";
    this.objPoHeader.isDeliver = false;
    this.objPoHeader.isEnter = false;
    this.objPoHeader.pODateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.objPoHeader.requestedDeliveryDate = "";
    this.objPoHeader.taxAmount;
    this.objPoHeader.totalPoamount;
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objPoHeader.userID = UserDet.userId;

  

    this.paymentMethodService.getpaymentMethodList().subscribe(response => {
      this.lstPaymentMethod = response;
    }, err => {
      //alert('in-Error - payment method');
      });

    this.purchaseorderService.getQuotationListGrid().subscribe(response => {
      if (response) {
        this.gridQuotationList = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationList(this.gridQuotationList);
      }
    })

    this.purchaseorderService.getQuotatioDetailsGrid(this.objPoHeader).subscribe(response => {
      if (response) {
        this.gridquotationDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationDetails(this.gridquotationDeatils);
      }
    })

  
    this.poreportdataservice.currentObject.subscribe(object => this.dataObj = object); 

  }

  CreateGridQuotationList(gridQuotationList: DataGridTable) {

    this.QuotationListColumnDefs = gridQuotationList.dataGridColumns;
    this.QuotationListRowData = gridQuotationList.dataGridRows;

    this.QuotationListColumnDefs.push({
      headerName: 'Raise PO',
      cellRenderer: "raisepobuttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });



  }

  CreateGridQuotationDetails(gridquotationDeatils: DataGridTable) {

    this.QuotationDeatilsColumnDefs = gridquotationDeatils.dataGridColumns;
    this.QuotationDeatilsRowData = gridquotationDeatils.dataGridRows;

   

    //this.QuotationDeatilsColumnDefs.push({
    //  headerName: 'POUnitPrice',
    //  editable: true, width: 180, suppressMenu: true
    //});

    //this.QuotationDeatilsColumnDefs.push({
    //  headerName: 'Qty',
    //  editable: true, width: 180, suppressMenu: true
    //});

    //this.QuotationDeatilsColumnDefs.push({
    //  headerName: 'Total Amount',
    //  editable: true, width: 180, suppressMenu: true
    //});

    this.QuotationDeatilsColumnDefs.push({
      headerName: 'Remove',
      cellRenderer: "removebuttonRenderer", width: 180, suppressMenu: true
    });
   

  }

  PaymentMethodChanged(objpaymentmethod) {
   
    this.selectedPaymentMethod = objpaymentmethod
  }


  onGridReadyQuotationList(params) {
    this.quotationListgridApi = params.api;
    this.quotationListgridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

  }

  onGridReadyQuotationDetailsList(params) {
    this.quotationDeatilsListgridApi = params.api;
    this.quotationDeatilsListgridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

  }

  onCellValueChanged(event) {
    console.log("zzzz=>", event);
    console.log("www=>", event.data);
    event.data.modified = true;
  }


  GridRaisePOCellClicked(node) {
    this.show = true;
    console.log(node.data);
    this.objPoHeader.pODateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.objPoHeader.quotationRequestHeaderID = node.data.QuotationRequestHeaderID;
    this.objPoHeader.requestedDeliveryDate = node.data.RequiredDate;
   

    this.purchaseorderService.getQuotatioDetailsGrid(this.objPoHeader).subscribe(response => {
      if (response) {
        this.gridquotationDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationDetails(this.gridquotationDeatils);
      }
     
    });

    
    
    this.requiredDate = node.data.RequiredDate;
    this.quotationNumber = node.data.QuotationNumber;
    
  }

  GridRemoveCellClicked(node) {

    var deletedRow = node.data;
    this.quotationDeatilsListgridApi.updateRowData({ remove: [deletedRow] });

    this.getAllData();
    
  }

  getAllData() {

      this.quotationDetailsGridData = [];
      this.quotationDeatilsListgridApi.forEachNode(node => {
      

      this.objPoDetails = new Podetails();
      this.objPoDetails.itemID = node.data.ItemID;
      this.objPoDetails.unitPrice = node.data.UnitPrice;
      this.objPoDetails.qty = node.data.Quantity;
      this.objPoDetails.discountAmount = node.data.DiscountAmount;
      this.objPoDetails.totalAmount = node.data.Quantity * node.data.UnitPrice;
      this.objPoHeader.podetail.push(this.objPoDetails);
    });
    console.log(this.objPoHeader); 
    return this.objPoHeader;
  }



  SavePurchaseOrder() {



    this.objPoHeader.pODateTime = (moment().format("MM/DD/YYYY HH:mm"));
    this.getAllData();

    //localStorage.removeItem("PoReport");
  
    this.purchaseorderService.savePurchaseOrder(this.objPoHeader, this.isEditMode)
      .subscribe(Response => {
       
        console.log("zzzz=>", Response.details);
        this.objPoHeader.poHeaderID = Response.details;


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
        }



        // alert('The record has been saved successfully');
        var result = Response.resultObject;
        this.gridQuotationList = new DataGridTable(result.rowSelection, result.enableSorting,
          result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
        this.CreateGridQuotationList(this.gridQuotationList);
        
        Swal.fire({
          icon: 'success',
          text: 'The record has been saved successfully',

          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#61CD23'
        });

        var poreport = JSON.stringify(this.objPoHeader);
        localStorage.setItem("PoReport", poreport);

        //alert('The record has been saved successfully');
        this.show = false;

        this.objPoHeader.totalPoamount = null;
        this.requiredDate = "";
        this.objPoHeader.paymentMethodID = "";
        this.selectedPaymentMethod = "";
        this.objPoHeader.taxAmount = null;
        this.objPoHeader.poNumber = "";
        this.objPoHeader.isDeliver = false;
      }, err => {
        //alert('Save Unsuccessful');
        console.log("err =>", err);
      });



    let dataObject = {
      requestedDeliveryDate: "5/31/2020",
      age: 30 ,
      ponumber: 8935353535,
      quoationno: 623722328

    }

    console.log('====================Respone Check======================================');
    console.log(Response);


    

    

  ////  this.poreportdataservice.changeObject(Response);


  //localStorage.setItem('PoReport', JSON.stringify(this.objPoHeader));//// new
    this.poreportdataservice.changeObject(Response);
   
    this.router.navigate([]).then(result => { window.open('#/purchaseorder/poreport', '_blank') });

    console.log(this.objPoHeader);
    

  }

  


  //SaveSupplierMaster() {
  //  this.suplierMasterService.saveSupplierMaster(this.objSupplierMaster, this.isEditMode)
  //    .subscribe(response => {
  //      alert('in');
  //    }, err => {
  //      alert('in-Error - c');
  //    });

  //}
 

 
    //this.objpurchaseOrder = new Purchaseorder();
    //this.objpurchaseOrder.unitValue = "100";
    //this.objpurchaseOrder.taxAmount = "50";
    //this.objpurchaseOrder.itemQuantity = "300";
    //this.objpurchaseOrder.discount = "10%";
    //this.objpurchaseOrder.delivaryDate = "19-08-2019";
    //this.objpurchaseOrder.totalPOAmount = "2000";
    //this.objpurchaseOrder.TaxID = "";

   // this.lsttax = this.taxService.getTaxList();

  //  this.taxService.getTaxList().subscribe(response => {

  //    this.lsttax = response;
  //  }, err => {
  //    alert('in-Error tax');
  //  });
  //}

  //TaxChanged(objItemcategory) {
  //  this.objpurchaseOrder.TaxID = this.selectedTax;
  //}
  

  //onGridReady(params) {
  //  this.gridApi = params.api;
  //  this.gridColumnApi = params.columnApi;

  //  params.api.sizeColumnsToFit();
  //}

 
  //SecondGridCheckCellClicked(rowIndex, Header) {

  //  this.show2 = !this.show2;
  //  this.show3 = false;
  //}

  //GridThirdCheckCellClicked() {

  //  this.show3 = !this.show3;
  //}

  //GridEditCellClicked(rowIndex, Header) {
  //  //alert('EditIndex :' + rowIndex + ',Header :' + Header);
  //}


  //GridDeleteCellClicked(rowIndex, Header) {
  //  //alert('DeleteIndex :' + rowIndex + ',Header :' + Header);
  //  const dialogRef = this.dialog.open(DeletepopupComponent, {
  //    width: '500px',
  //    height: '265px ',
  //    position: {
  //      top: '',
  //      bottom: '',
  //      left: '460px',
  //      right: ''
  //    }
  //  });
  //}

  public getSelectedRows(event: any) {
    let rowsSelection = this.gridApi.getSelectedRows();
    //console.info(rowsSelection);
    var rowCount = event.api.getSelectedNodes().length;
    //console.info(rowsSelection);
    console.info('a', rowCount)

    if (event.api.getSelectedNodes(event).length == 1) {
      this.show = true;
      this.show2 = false;      
      console.info('a', rowsSelection)
    }
    else {
      this.show = false;
      this.show2 = false;
    }
  }

  public getSelectedRows2(event: any) {
    let rowsSelection = this.gridApi.getSelectedRows();
    //console.info(rowsSelection);
    var rowCount = event.api.getSelectedNodes().length;
    //console.info(rowsSelection);
    console.info('a', rowCount)

    if (event.api.getSelectedNodes(event).length == 1) {
      this.show2 = true;
      this.show3 = false;
      console.info('a', rowsSelection)
    }
    else {
      this.show2 = false;
      this.show3 = false;
    }
  }

}
