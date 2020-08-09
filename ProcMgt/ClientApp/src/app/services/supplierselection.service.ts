import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierselectionService {

  constructor() { }

  supplierSelectioncolumnDefs = [];
  supplierSelectioncolumnDefs2 = [];
  supplierSelectionRowData = [];
  supplierSelectionRowData2 = [];

  getsupplierSelectioncolumnDefs() {
    this.supplierSelectioncolumnDefs = [
      { headerName: 'Request No', field: 'reqNo', width: 150, suppressMenu: true },
      { headerName: 'Item Category', field: 'itemCategory', width: 160, suppressMenu: true },
      { headerName: 'Make', field: 'make', width: 130, suppressMenu: true },
      { headerName: 'Model', field: 'model', width: 120, suppressMenu: true },
      { headerName: 'Request Qty', field: 'reqQty', width: 110, suppressMenu: true },
      { headerName: 'Priority Level', field: 'priorityLevel', width: 140, suppressMenu: true },
      {
        headerName: 'More Details',
        cellRenderer: "moredetailsbuttonRenderer", width: 130, suppressMenu: true
      },
      { headerName: '', field: 'check', width: 100, cellRendererParams: { checkbox: true }, checkboxSelection: true, suppressMenu: true }
    ];

    return this.supplierSelectioncolumnDefs;
  }

  getsupplierSelectioncolumnDefs2() {
    this.supplierSelectioncolumnDefs2 = [
      { headerName: 'Name', field: 'name', width: 150, suppressMenu: true },
      { headerName: 'Supplier Type', field: 'supplyType', width: 160, suppressMenu: true },
      { headerName: 'Min Quantity', field: 'minQty', width: 130, suppressMenu: true },
      { headerName: 'Max Quantity', field: 'maxQty', width: 120, suppressMenu: true },
      { headerName: 'Payment Type', field: 'paymentType', width: 110, suppressMenu: true },
      { headerName: 'Contact No', field: 'contactNo', width: 140, suppressMenu: true },
      { headerName: '', field: 'check', width: 100, cellRendererParams: { checkbox: true }, cellRenderer: 'checkboxRenderer', suppressMenu: true }
    ];

    return this.supplierSelectioncolumnDefs2;
  }  

  getsupplierSelectionRowData() {
    this.supplierSelectionRowData = [
      { reqNo: '001', itemCategory: 'Item Category 1', make: 'Make 1', model: 'Model 1', reqQty: ' 100', priorityLevel: 'Level 1', check: '' },
      { reqNo: '002', itemCategory: 'Item Category 2', make: 'Make 2', model: 'Model 2', reqQty: ' 200', priorityLevel: 'Level 2', check: '' },
      { reqNo: '003', itemCategory: 'Item Category 3', make: 'Make 3', model: 'Model 3', reqQty: ' 300', priorityLevel: 'Level 3', check: '' },
      { reqNo: '004', itemCategory: 'Item Category 4', make: 'Make 4', model: 'Model 4', reqQty: ' 400', priorityLevel: 'Level 4', check: '' }
    ];
    return this.supplierSelectionRowData;
  }

  getsupplierSelectionRowData2() {
    this.supplierSelectionRowData2 = [
      { name: 'Supplier 01', supplyType: 'Supplier Type 1', minQty: '100', maxQty: '1000', paymentType: 'Cash', contactNo: '0123456789', check: '' },
      { name: 'Supplier 02', supplyType: 'Supplier Type 2', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' },
      { name: 'Supplier 03', supplyType: 'Supplier Type 3', minQty: '100', maxQty: '1000', paymentType: 'Cash', contactNo: '0123456789', check: '' },
      { name: 'Supplier 04', supplyType: 'Supplier Type 4', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' }
    ];
    return this.supplierSelectionRowData2;
  }

}
