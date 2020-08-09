import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoapprovalService {

  constructor() { }

  poapprovalcolumnDefs = [];
  poapprovalRowData = [];

  getpoapprovalcolumnDefs() {
    this.poapprovalcolumnDefs = [
      { headerName: 'Purchase Order No', field: 'purchaseOrderNo', width: 150, suppressMenu: true },
      { headerName: 'Supplier', field: 'Supplier', width: 160, suppressMenu: true },
      { headerName: 'Delivery date', field: 'deliveryDate', width: 130, suppressMenu: true },
      {
        headerName: 'More Details',
        cellRenderer: "moredetailsbuttonRenderer", width: 130, suppressMenu: true
      },
      {
        headerName: 'Approve',
        cellRenderer: "PoapprovalpopupRendererComponent", width: 130, suppressMenu: true
      },
      //{ headerName: 'check', field: 'check', width: 100, cellRendererParams: { checkbox: true }, cellRenderer: "checkboxRenderer", suppressMenu: true }
    ];
    return this.poapprovalcolumnDefs;
  }

  getpoapprovalRowData() {
    this.poapprovalRowData = [
      { purchaseOrderNo: '001', Supplier: 'Winsoft', deliveryDate: '2019/9/20', check: '' },
      { purchaseOrderNo: '002', Supplier: 'MD Gunasena', deliveryDate: '2019/8/20', check: '' },
      { purchaseOrderNo: '003', Supplier: 'Unity', deliveryDate: '2019/10/20', check: '' }
    ];

    return this.poapprovalRowData;
  }
}
