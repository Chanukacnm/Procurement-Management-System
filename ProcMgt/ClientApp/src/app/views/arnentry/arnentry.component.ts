import { Component, OnInit } from '@angular/core';
import { Arnentry } from '../../models/arnentry';
import { Arndetail } from '../../models/arndetail';
import { Arnheader } from '../../models/arnheader';
import { ArnentryService } from '../../services/arnentry.service';

import { ArnpopupComponent } from '../arnpopup/arnpopup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { ArnButtonrenderer } from '../renderer/button-renderer/arn-buttonrenderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { PurchaseorderService } from '../../services/purchaseorder.service';
import { DataGridTable } from '../../models/datagridtable';
import { Poheader } from '../../models/poheader';
import * as moment from 'moment';
import Swal from 'sweetalert2';
//import { Itemcategory } from '../../models/itemcategory';


@Component({
  selector: 'app-arnentry', 
  templateUrl: './arnentry.component.html', 
  styleUrls: ['./arnentry.component.scss']
})
export class ArnentryComponent implements OnInit {

 
  private objARNHeader: Arnheader;
  private objArnDetail: Arndetail;

  private objPOheader: Poheader ;
  
  private POListgridApi;
  private POListgridColumnApi;
  private ARNDetailsListgridApi;
  private ARNDetailsListgridColumnApi;

  private gridPOList: DataGridTable;
  private gridARNDeatils: DataGridTable;

  private gridApi;
  private gridColumnApi;
  private context;
  private frameworkComponents;

  public show: boolean = false;
  private ARNcolumnDefs;
  private ARNrowData;
  private PurchaseOrderColumnDefs;
  private PurchaseOrderrowData;
  private ponumber = "";
  private quotationDetailsGridData;

  private isEditMode = false;
  
  constructor(public dialog: MatDialog, private purchaseorderservice: PurchaseorderService, private arnentryservice: ArnentryService )
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRenderer,
      buttonRenderer: ButtonRenderer,
      buttonRenderertwo: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer,
      arnrenderer: ArnButtonrenderer
    }
  }

  ngOnInit() {
    this.objARNHeader = new Arnheader();
    this.objARNHeader.arndetail = [];
    
    this.arnentryservice.getpoListGrid().subscribe(response => {
      if (response) {
        this.gridPOList = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridPurchaseOrderList(this.gridPOList);
      }
    })

    console.log(this.objARNHeader);

    this.arnentryservice.getARNdetailListGrid(this.objARNHeader).subscribe(response => {
      if (response) {
        this.gridARNDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridARNDetailList(this.gridARNDeatils);
      }
    })
    
  }

  onGridReadyPOList(params) {
    this.POListgridApi = params.api;
    this.POListgridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  onGridReadyARNDetailsList(params) {
    this.ARNDetailsListgridApi = params.api;
    this.ARNDetailsListgridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

  }

  GridARNCellClicked(node) {
    this.show = true;

    this.objARNHeader.poheaderID = node.data.PoheaderID;
    
    //console.log("aaaa",node.data);
    //console.log(this.objARNHeader);

    console.log("second time ARN click",this.objARNHeader);

    this.arnentryservice.getARNdetailListGrid(this.objARNHeader).subscribe(response => {
      if (response) {
        this.gridARNDeatils= new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridARNDetailList(this.gridARNDeatils);
      }
     // console.log(this.objARNHeader);
    });

    this.ponumber = node.data.Ponumber;

    //this.requiredDate = node.data.RequiredDate;
    //this.quotationNumber = node.data.QuotationNumber;
  }

  CreateGridARNDetailList(gridARNDetail: DataGridTable) {

    this.ARNcolumnDefs = gridARNDetail.dataGridColumns;
    this.ARNrowData = gridARNDetail.dataGridRows;

  }

  CreateGridPurchaseOrderList(gridPurchaseOrder: DataGridTable) {

    this.PurchaseOrderColumnDefs = gridPurchaseOrder.dataGridColumns;
    this.PurchaseOrderrowData = gridPurchaseOrder.dataGridRows;

    this.PurchaseOrderColumnDefs.push({
      headerName: 'ARN',
      cellRenderer: "arnrenderer", width: 100, suppressMenu: true

    });

  }

  onCellValueChanged(event) {
    //console.log("zzzz=>", event);
    //console.log("www=>", event.data);
    event.data.modified = true;
  }

  getAllData() {

    this.quotationDetailsGridData = [];
    this.ARNDetailsListgridApi.forEachNode(node => {

      this.objArnDetail = new Arndetail();
      this.objArnDetail.arndetailID = node.data.ArndetailID;
      this.objArnDetail.arnheaderID = node.data.ArnheaderID;
      this.objArnDetail.invoiceQty = node.data.InvoiceQty;
      this.objArnDetail.itemID = node.data.ItemID;
      this.objArnDetail.recivedQty = node.data.RecivedQty;
      this.objArnDetail.rejectedQty = node.data.RejectedQty;
      this.objArnDetail.remark = node.data.Remark;
      this.objARNHeader.arndetail.push(this.objArnDetail);
    });
    //console.log("obj=>", this.objArnDetail);
    return this.objARNHeader;
  }


  SaveArnEntry() {

    this.getAllData();

    console.log("obj=>", this.objARNHeader);

    this.arnentryservice.saveArnEntry(this.objARNHeader, this.isEditMode)
      .subscribe(response => {

        var result = response.resultObject;
        var result2 = response.message;
        var result3 = response.status;
        var NewARN = response.details; //--- Add By Nipuna Francisku 

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

        this.gridPOList = new DataGridTable(result.rowSelection, result.enableSorting, result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
        this.CreateGridPurchaseOrderList(this.gridPOList);

        Swal.fire({
          icon: 'success',
          //text: 'The record has been saved successfully..!',
          text: 'The record has been saved successfully ARN :- ' + NewARN, //--- Add By Nipuna Francisku 
 
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#61CD23'

        });

        //this.objARNHeader.arnnumber = ''; //----Cmd By Nipuna Francisku
        this.objARNHeader.recivedDate = (moment().format("MM/DD/YYYY HH:mm"));
        this.objARNHeader.invoiceNo = '';
        this.objARNHeader.invoiceAtt = '';
        this.objARNHeader.arnremark = '';
        this.show = false;

      }, err => {
        //alert('Save Unsuccessfull');
      });

    //this.objARNHeader.arnnumber = '';
    //this.objARNHeader.recivedDate = '';
    //this.objARNHeader.invoiceNo = '';
    //this.objARNHeader.invoiceAtt = '';
    //this.objARNHeader.arnremark = '';

   // console.log(this.objARNHeader);
    
  }

  GridEditCellClicked(rowIndex, Header) {
    //alert('EditIndex :' + rowIndex + ',Header :' + Header);
  }

  GridDeleteCellClicked(rowIndex, Header) {
    //alert('DeleteIndex :' + rowIndex + ',Header :' + Header);
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
  }


  public getSelectedRows(event: any) {
    let rowsSelection = this.gridApi.getSelectedRows();
    //console.info(rowsSelection);
    var rowCount = event.api.getSelectedNodes().length;
    //console.info(rowsSelection);
    console.info('a', rowCount)

    if (event.api.getSelectedNodes(event).length == 1) {
      this.show = true;
      console.info('a', rowsSelection)
    }
    else {
      this.show = false;
    }
  }

  onSearch() { }

  onAdd() {}

  onNew() { }

  reset() {

    //this.objARNHeader.arnnumber = ''; //----Cmd By Nipuna Francisku
    this.objARNHeader.recivedDate = (moment().format("MM/DD/YYYY HH:mm"));
    this.objARNHeader.invoiceNo = '';
    this.objARNHeader.invoiceAtt = '';
    this.objARNHeader.arnremark = '';


    this.arnentryservice.getARNdetailListGrid(this.objARNHeader).subscribe(response => {
      if (response) {
        this.gridARNDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridARNDetailList(this.gridARNDeatils);
      }
      // console.log(this.objARNHeader);
    });

  }

  onSave() {}
}
