import { Component, OnInit } from '@angular/core';
import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
import { RfqbuttonRenderer } from '../renderer/button-renderer/rfqbutton-renderer.component';
import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
import { CheckboxsaveRenderer } from '../renderer/button-renderer/checkboxsave-renderer.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { PurchaserequestComponent } from '../purchaserequest/purchaserequest.component';
import { SupplierselectionService } from '../../services/supplierselection.service';

@Component({
  selector: 'app-supplierselection',
  templateUrl: './supplierselection.component.html',
  styleUrls: ['./supplierselection.component.scss']
})
export class SupplierselectionComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public show: boolean = false;
  private context;
  private frameworkComponents;

  constructor(public dialog: MatDialog, private supplierselectionService: SupplierselectionService) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      moredetailsbuttonRenderer: MoredetailsbuttonRenderer,
      checkboxRenderer: CheckboxRenderer,
      checkboxSaveRenderer: CheckboxsaveRenderer
    }
  }

  ngOnInit() {
  }

  columnDefs = this.supplierselectionService.getsupplierSelectioncolumnDefs();
  columnDefs2 = this.supplierselectionService.getsupplierSelectioncolumnDefs2();
  rowData = this.supplierselectionService.getsupplierSelectionRowData();
  rowData2 = this.supplierselectionService.getsupplierSelectionRowData2();

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }



  GridMoreDetailsCellClicked(rowIndex, Header) {
    // alert('MoreDetailsIndex :' + rowIndex + ',Header :' + Header);
    const dialogRef = this.dialog.open(PurchaserequestComponent, {
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
    //}
  }

  //GridCheckSaveCellClicked(rowIndex, Header) {
  //  //alert('CheckedSaveIndex :' + rowIndex + ',Header :' + Header);
  //  //alert('Saved Data into Database.');
  //}

  //GridCheckCellClicked(rowIndex, Header) {
  //  //alert('CheckedIndex :' + rowIndex + ',Header :' + Header);
  //  this.show = !this.show;
  //}

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

  onSave() {}


}
