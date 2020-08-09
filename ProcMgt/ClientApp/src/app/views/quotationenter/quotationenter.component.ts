import { Component, OnInit } from '@angular/core';
import { Quotationenter } from '../../models/quotationenter';
import {QuotationenterService} from '../../services/quotationenter.service';
import { TaxService } from '../../services/tax.service';
import { PaymentmethodService } from '../../services/paymentmethod.service';
import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { PurchaserequestComponent } from '../purchaserequest/purchaserequest.component';
import { SuppliermasterComponent } from '../suppliermaster/suppliermaster.component';
import { QuotationattachedpopupComponent } from '../quotationattachedpopup/quotationattachedpopup.component';
import { AgCheckbox, AgRadioButton, RowNode, SelectCellEditor } from 'ag-grid-community';
import { QuotationattachedpopupRenderer } from '../renderer/button-renderer/quotationattachedpopup-renderer.component';
import { QuotationenterRendererComponent } from '../renderer/button-renderer/quotationenter-renderer.component';
import { SecondSelectionCheckboxRenderer } from '../renderer/button-renderer/second-selection-checkbox-renderer.component';
import { DataGridTable } from '../../models/datagridtable';
import { Quotationrequestdetails } from '../../models/quotationrequestdetails';
import { AttachbuttonRenderer } from '../renderer/button-renderer/attachbutton-renderer.component';
import { DatepickerRenderer } from '../renderer/button-renderer/datepicker-renderer.component';
import { Quotationerequestheader } from '../../models/quotationerequestheader';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quotationenter',
  templateUrl: './quotationenter.component.html',
  styleUrls: ['./quotationenter.component.scss']
})
export class QuotationenterComponent implements OnInit {

  private objQuotationEnter: Quotationrequestdetails;
  private objQuotationrequestHeader: Quotationerequestheader;
  private lstQutationEnter;
  private lsttax;
  private lstPaymentMethod;

  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  private context;
  private frameworkComponents;
  private pendingQuotReqDetColums;
  private pendingQuotReqDetData;
  private QuotationEntercolumns;
  private QuotationEnterrowData;
  private quotationdate;
  private gridPendingQuotationReqDetails: DataGridTable;
  private gridquotationDeatils: DataGridTable;
  public show: boolean = false;

  constructor(public dialog: MatDialog, private quotationEnterService: QuotationenterService, private taxService: TaxService, private paymentMethodService: PaymentmethodService) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      attachbuttonrenderer: AttachbuttonRenderer,
      datepicker: DatepickerRenderer,
      quotationenterrenderer: QuotationenterRendererComponent,
    }
  }

  ngOnInit() {

   
    this.objQuotationEnter = new Quotationrequestdetails();
    this.objQuotationrequestHeader = new Quotationerequestheader();
    this.objQuotationrequestHeader.quotationRequestDetails = [];

    this.quotationEnterService.getPendingQuotationReqdetailsGrid().subscribe(response => {
      if (response) {

        this.gridPendingQuotationReqDetails = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridPendingQuotationRequestDet(this.gridPendingQuotationReqDetails);

      }
    })

    this.quotationEnterService.getQuotatioDetailsGrid(this.objQuotationEnter).subscribe(response => {
      if (response) {

        //console.log(response.dataGridColumns.pop);

        response.dataGridColumns


        this.gridquotationDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationDetails(this.gridquotationDeatils);
      }
    })
    
  }

  CreateGridPendingQuotationRequestDet(gridPendingQuotationReqDetails: DataGridTable) {
    this.pendingQuotReqDetColums = gridPendingQuotationReqDetails.dataGridColumns;
    this.pendingQuotReqDetData = gridPendingQuotationReqDetails.dataGridRows;

    this.pendingQuotReqDetColums.push({
      headerName: 'Quotation',
      cellRenderer: "quotationenterrenderer", width: 140, suppressMenu: true , lockPosition: true, 
    });
  }

  CreateGridQuotationDetails(gridquotationDeatils: DataGridTable) {

    this.QuotationEntercolumns = gridquotationDeatils.dataGridColumns;
    this.QuotationEnterrowData = gridquotationDeatils.dataGridRows;

    //console.log("test", this.QuotationEnterrowData);

    this.QuotationEntercolumns.push({
      headerName: 'Select QuotationValidDate',
      cellRenderer: "datepicker", width: 200, rowHeight: 80,
    });

    this.QuotationEntercolumns.push({
      headerName: 'Attachment',
      cellRenderer: "attachbuttonrenderer", width: 250, rowHeight: 80,

    });

    //this.QuotationEnterrowData.push({
    //  QuotationValidDate: moment().format("DD/MM/YYYY"),
    //})
    
  }

  //onCellClicked(event) {
  //  debugger;
  //  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", event);

  //  event.colDef.type = "number";
  //}

  onCellValueChanged(event) {
    debugger;
    console.log("zzzz=>", event);
    //console.log("www=>", event.data);

    //if (event.data.UnitPrice) { 
    //  return {
    //    component: 'numericCellEditor'

    //  };
    //}

    //console.log("aqaq", event.data.UnitPrice * event.data.Quantity);
    event.data.GrossAmount = event.data.UnitPrice * event.data.Quantity;
    console.log("wwww=>", event.data);
    event.data.NetAmount = event.data.GrossAmount - event.data.DiscountAmount;
    //this.gridApi2.forEachNode(node => {
    //console.log("jjjj=>", this.gridApi2.getRowNode());

      
    //this.gridApi2.setDataValue(event.data.NetAmount);
    //var selectedRows = this.gridApi2.getSelectedRows(event);
    //console.log("ffff=>", selectedRows);
    //});

    event.data.modified = true;
    this.gridApi2.redrawRows();
    event.data.update;
    //this.gridApi2.getRowNode()
  }

  saveModifiedRows() {
    //const allRowData = []; 
    //this.gridApi2.forEachNode(node => allRowData.push(node.data));
    //const modifiedRows = allRowData.filter(row => row['modified']);
    //this.objQuotationrequestHeader.isEnteringCompleted = true;

    this.gridApi2.forEachNode(node => {
      console.log("kkkk=>", node);
      console.log("jjjj=>", node.data);


      this.objQuotationEnter = node.data;
      console.log("bbbb=>", node.data);

      this.objQuotationrequestHeader.quotationRequestDetails.push(this.objQuotationEnter);
      console.log("llll=>", this.objQuotationEnter);

    });
    //console.log("qqqq=>", allRowData);
    ////console.log("cccc=>", modifiedRows);
    //console.log("ffff=>", allRowData.filter(row => row['modified']) );

    //this.quotationEnterService.updateQuotationEnter(modifiedRows)
    //  .subscribe(response => {
    //    alert('in');
    //  }, err => {
    //    alert('in-Error - c');
    //  });
    
    //var i = 0;

    //for (i; i<modifiedRows.length; i++) {
    //  //this.objQuotationrequestHeader.quotationRequestDetails.push(modifiedRows[i]);
    //  //this.objQuotationEnter.quotationRequestDetailID = ;
    //  //this.objQuotationEnter

    //}
    console.log("pppp=>", this.objQuotationrequestHeader.quotationRequestDetails);
    console.log("gggg=>", this.objQuotationrequestHeader);

    this.quotationEnterService.updateQuotationEnter(this.objQuotationrequestHeader)
      .subscribe(response => {
        Swal.fire({
          icon: 'success',
          text: 'The record has been saved successfully',

          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#61CD23'
        });

        var result = response.resultObject;

        this.gridPendingQuotationReqDetails = new DataGridTable(result.rowSelection, result.enableSorting,
          result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
        this.CreateGridPendingQuotationRequestDet(this.gridPendingQuotationReqDetails);


        this.show = false;
        //alert('The record has been saved successfully ');
      }, err => {
        //alert('Quotation Enter Unsuccesful');
      });
    

  }

  GridDate2CellClicked(node) {
    
    console.log("oooo=>", node);
  }

  //GridDateCellClicked(objdate) {

  //  var quotationValidDate = moment(objdate, 'YYYY-MM-DD');
  //  this.quotationdate = (moment(quotationValidDate).format('MM/DD/YYYY'));
  //  console.log("mmmm=>", this.quotationdate);
  //}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  onGridReady2(params) {

    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;

    //params.api.sizeColumnsToFit();
  }
  
  //onSelectionChanged()
  //  {
  //    var selectedRows = this.gridApi.getSelectedRows();
  //    var selectedRowsString = "";
  //    selectedRows.forEach(function (selectedRow, index) {
  //      if (index > 5) {
  //        return;
  //      }
  //      if (index !== 0) {
  //        selectedRowsString += ", ";
  //      }
  //      selectedRowsString += selectedRow.athlete;
  //    });
  //    if (selectedRows.length >= 5) {
  //      selectedRowsString += " - and " + (selectedRows.length - 5) + " others";
  //    }
  //    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  //  }


  //GridCheckCellClicked(rowIndex, Header) {
  //  // alert('CheckedIndex :' + rowIndex + ',Header :' + Header);

  //  this.show = !this.show;
  //  this.show2 = false;
  //  this.show3 = false;
  //}

  GridQuotationCellClicked(node) {
    this.show = true;
    console.log("aaa=>", node.data);
    this.objQuotationrequestHeader.quotationRequestHeaderID = node.data.QuotationRequestHeaderID;
    //this.objQuotationrequestHeader.supplierID = node.data.SupplierID;
    //this.objQuotationrequestHeader.quotationRequestedDate = node.data.QuotationRequestedDate;
    //this.objQuotationrequestHeader.quotationNumber = node.data.QuotationNumber;
    //this.objQuotationrequestHeader.userID = node.data.UserID;
    //this.objQuotationrequestHeader.requiredDate = node.data.RequiredDate;
    //this.objQuotationrequestHeader.quotationRequestStatusID = node.data.QuotationRequestStatusID;


    this.objQuotationEnter.quotationRequestHeaderID = node.data.QuotationRequestHeaderID;

    this.quotationEnterService.getQuotatioDetailsGrid(this.objQuotationEnter).subscribe(response => {
      if (response) {
        this.gridquotationDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationDetails(this.gridquotationDeatils);
      }
    });

    

  }

  

  //SecondGridCheckCellClicked(rowIndex, Header) {
  //  this.show3 = !this.show3;
  //  this.show4 = true;
  //}

  

  //public getSelectedRows(event: any) {
  //  let rowsSelection = this.gridApi.getSelectedRows();
  //  //console.info(rowsSelection);
  //  var rowCount = event.api.getSelectedNodes().length;
  //  //console.info(rowsSelection);
  //  console.info('a', rowCount)

  //  if (event.api.getSelectedNodes(event).length == 1) {
  //    //this.show = true;
  //    //this.show2 = false;
  //    //this.show3 = false;
  //    console.info('a', rowsSelection)
  //  }
  //  else {
  //    //this.show = false;
  //    //this.show2 = false;
  //    //this.show3 = false;
  //  }
  //}

  //public getSelectedRows2(event: any) {
  //  let rowsSelection = this.gridApi.getSelectedRows();
  //  //console.info(rowsSelection);
  //  var rowCount = event.api.getSelectedNodes().length;
  //  //console.info(rowsSelection);
  //  console.info('a', rowCount)

  //  if (event.api.getSelectedNodes(event).length == 1) {
  //    //this.show3 = true;
  //    console.info('a', rowsSelection)
  //  }
  //  else {
  //    //this.show3 = false;
  //  }
  //}


}

