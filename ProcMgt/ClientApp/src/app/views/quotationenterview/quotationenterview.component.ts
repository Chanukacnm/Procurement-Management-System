import { Component, OnInit, Inject } from '@angular/core';
import { DataGridTable } from '../../models/datagridtable';
import { Quotationrequestdetails } from '../../models/quotationrequestdetails';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { QuotationenterService } from '../../services/quotationenter.service';
import { QuotationenterRendererComponent } from '../renderer/button-renderer/quotationenter-renderer.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-quotationenterview',
  templateUrl: './quotationenterview.component.html',
  styleUrls: ['./quotationenterview.component.scss']
})
export class QuotationenterviewComponent implements OnInit {

  private objQuotationEnter: Quotationrequestdetails;

  private gridApi;
  private gridColumnApi;
  private gridApi2;
  private gridColumnApi2;
  private context;
  private frameworkComponents;
  private columnDefs;
  private rowData;
  private QuotationEntercolumns;
  private QuotationEnterrowData;
  private gridPendingQuotationReqDetails: DataGridTable;
  private gridquotationDeatils: DataGridTable;
  public show: boolean = false;

  constructor(public dialog: MatDialog,
    private quotationEnterService: QuotationenterService,) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      quotationenterrenderer: QuotationenterRendererComponent
    }
  }

  ngOnInit() {
    this.objQuotationEnter = new Quotationrequestdetails();

    this.quotationEnterService.getPendingQuotationReqdetailsGrid().subscribe(response => {
      if (response) {
        this.gridPendingQuotationReqDetails = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridPendingQuotationRequestDet(this.gridPendingQuotationReqDetails);

      }
    })

    this.quotationEnterService.getQuotatioDetailsGrid(this.objQuotationEnter).subscribe(response => {
      if (response) {
        this.gridquotationDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationDetails(this.gridquotationDeatils);
      }
    })
  }

  CreateGridPendingQuotationRequestDet(gridPendingQuotationReqDetails: DataGridTable) {
    this.columnDefs = gridPendingQuotationReqDetails.dataGridColumns;
    this.rowData = gridPendingQuotationReqDetails.dataGridRows;


    this.columnDefs.push({
      headerName: 'Quotation',
      cellRenderer: "quotationenterrenderer", width: 130, suppressMenu: true
    });
  }

  CreateGridQuotationDetails(gridquotationDeatils: DataGridTable) {

    this.QuotationEntercolumns = gridquotationDeatils.dataGridColumns;
    this.QuotationEnterrowData = gridquotationDeatils.dataGridRows;

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

  GridQuotationCellClicked(node) {
    this.show = true;
    console.log("aaa=>", node.data);
    this.objQuotationEnter.quotationRequestHeaderID = node.data.QuotationRequestHeaderID;

    this.quotationEnterService.getQuotatioDetailsGrid(this.objQuotationEnter).subscribe(response => {
      if (response) {
        this.gridquotationDeatils = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridQuotationDetails(this.gridquotationDeatils);
      }
    });

  }

}
