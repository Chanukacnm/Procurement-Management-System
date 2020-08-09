import { Component, OnInit } from '@angular/core';
import { Poapproval } from '../../models/poapproval';
import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
import { RfqbuttonRenderer } from '../renderer/button-renderer/rfqbutton-renderer.component';
import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { RfqpopupComponent } from '../rfqpopup/rfqpopup.component';
import { AgCheckbox, AgRadioButton } from 'ag-grid-community';
import { PoapprovalService } from '../../services/poapproval.service';
import { PurchaseorderComponent } from '../purchaseorder/purchaseorder.component';
import { PoapprovalpopupRendererComponent } from '../renderer/button-renderer/poapprovalpopup-renderer.component';
import { PoapprovalpopupComponent } from '../poapprovalpopup/poapprovalpopup.component';


@Component({
  selector: 'app-poapproval',
  templateUrl: './poapproval.component.html',
  styleUrls: ['./poapproval.component.scss']
})
export class PoapprovalComponent implements OnInit {

  private objPOApproval: Poapproval;
  private gridApi;
  private gridColumnApi;
  public show: boolean = false;
  private context;
  private frameworkComponents;

  constructor(public dialog: MatDialog, private poapprovalService: PoapprovalService) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      moredetailsbuttonRenderer: MoredetailsbuttonRenderer,
      checkboxRenderer: CheckboxRenderer,
      rfqbuttonRenderer: RfqbuttonRenderer,
      PoapprovalpopupRendererComponent: PoapprovalpopupRendererComponent
    }
  }

  ngOnInit() {
    this.objPOApproval = new Poapproval();
    this.objPOApproval.purchaseOrderNo = "001";
    }

  columnDefs = this.poapprovalService.getpoapprovalcolumnDefs();
  rowData = this.poapprovalService.getpoapprovalRowData();

  //columnDefs = [
  //    { headerName: 'Purchase Order No', field: 'purchaseOrderNo', width: 150, suppressMenu: true },
  //    { headerName: 'Supplier', field: 'Supplier', width: 160, suppressMenu: true },
  //    { headerName: 'Delivery date', field: 'deliveryDate', width: 130, suppressMenu: true },
  //    {
  //      headerName: 'More Details',
  //      cellRenderer: "moredetailsbuttonRenderer", width: 130, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Action',
  //      cellRenderer: "PoapprovalpopupRendererComponent", width: 130, suppressMenu: true
  //    },
  //    //{ headerName: 'check', field: 'check', width: 100, cellRendererParams: { checkbox: true }, cellRenderer: "checkboxRenderer", suppressMenu: true }
  //  ];

  //rowData = [
  //  { purchaseOrderNo: '001', Supplier: 'Item Category 1', deliveryDate: '2019/9/20', check: '' },
  //  { purchaseOrderNo: '002', Supplier: 'Item Category 2', deliveryDate: '2019/8/20', check: '' },
  //  { purchaseOrderNo: '003', Supplier: 'Item Category 3', deliveryDate: '2019/10/20', check: '' },
   
  //];

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  GridMoreDetailsCellClicked(rowIndex, Header) {
    const dialogRef = this.dialog.open(PurchaseorderComponent, {
      width: '1500px',
      height: '550px ',
      position: {
        top: '80px',
        bottom: '',
        left: '220px',
        right: '30px'
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  GridCheckCellClicked(rowIndex, Header)
  {

    this.show = !this.show;
  }

  GridAttachedCellClicked() {
    const dialogRef = this.dialog.open(PoapprovalpopupComponent, {
      width: '600px',
      height: '345px ',
      position: {
        top: '',
        bottom: '',
        left: '460px',
        right: ''
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }
}

