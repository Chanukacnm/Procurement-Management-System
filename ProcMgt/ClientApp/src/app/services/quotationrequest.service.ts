import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotationrequestService {

  constructor() { }
  quotationrequestcolumnDefs = [];
  quotationrequestcolumnDefs2 = [];

  quotationrequestRowData = [];
  quotationrequestRowData2 = [];

  getquotationrequestcolumnDefs() {
    this.quotationrequestcolumnDefs = [
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
      {
        headerName: 'Select',
        field: 'check',
        width: 100,
        cellRendererParams: { checkbox: true },
        checkboxSelection: true,

      }
    ];
    return this.quotationrequestcolumnDefs;
  }

  getquotationrequestcolumnDefs2() {
    this.quotationrequestcolumnDefs2 = [
      { headerName: 'Name', field: 'name', width: 150, suppressMenu: true },
      { headerName: 'Supplier Type', field: 'supplyType', width: 160, suppressMenu: true },
      { headerName: 'Min Quantity', field: 'minQty', width: 130, suppressMenu: true },
      { headerName: 'Max Quantity', field: 'maxQty', width: 120, suppressMenu: true },
      { headerName: 'Payment Type', field: 'paymentType', width: 110, suppressMenu: true },
      { headerName: 'Contact No', field: 'contactNo', width: 140, suppressMenu: true },
      {
        headerName: 'RFQ',
        cellRenderer: "rfqbuttonRenderer", width: 130, suppressMenu: true
      },
      { headerName: 'Send', field: 'check', width: 100, cellRendererParams: { checkbox: true }, cellRenderer: "agGroupCellRenderer" }
    ];
    return this.quotationrequestcolumnDefs2;
  }

  getquotationrequestRowData() {
    this.quotationrequestRowData = [
      { reqNo: '001', itemCategory: 'Stationary', make: 'Atlas', model: 'Single rule', reqQty: ' 100', priorityLevel: 'Low', check: '' },
      { reqNo: '002', itemCategory: 'Electronic', make: 'Asus', model: 'Vivo Book', reqQty: ' 200', priorityLevel: 'Important', check: ''},
      { reqNo: '003', itemCategory: 'Electronic', make: 'Epson', model: 'L805', reqQty: ' 300', priorityLevel: 'Important', check: ''},
      { reqNo: '004', itemCategory: 'Electronic', make: 'Siger', model: 'LP223', reqQty: ' 400', priorityLevel: 'Critical', check: ''}
    ]
    return this.quotationrequestRowData;
  }

  getquotationrequestRowData2() {
    this.quotationrequestRowData2 = [
      { name: 'Winsoft', supplyType: 'Exporters', minQty: '100', maxQty: '100', paymentType: 'Cash', contactNo: '0123456789', check: '' },
      { name: 'MD Gunasena', supplyType: 'Distributors', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' },
      { name: 'Unity', supplyType: 'Exporters', minQty: '100', maxQty: '1000', paymentType: 'Cash', contactNo: '0123456789', check: '' },
      { name: 'PC House', supplyType: 'Exporters', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' }
    ]
    return this.quotationrequestRowData2;
  }

}
