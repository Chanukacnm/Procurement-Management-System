import { Injectable } from '@angular/core';
import { Poheader } from '../models/poheader';
import { ResultTransfer } from '../helpers/result-transfer';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';


@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService {

  constructor(private http: HttpClient) { }

  getQuotationListGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/PurchaseOrder/GetQuotationListGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  getQuotatioDetailsGrid(objPoHeader): Observable<DataGridTable> {
    var data = JSON.stringify(objPoHeader);
    return this.http.post<DataGridTable>("https://localhost:44353/api/PurchaseOrder/GetQuotatioDetailsGrid", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  savePurchaseOrder(objPoheader: Poheader, isEditMode: boolean): any {
    
   
    var data = JSON.stringify(objPoheader);
    if (!isEditMode) {

      return this.http.post("https://localhost:44353/api/PurchaseOrder/SavePurchaseOrderAsync", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });

    }
    else {

      return this.http.post("https://localhost:44353/api/Model/UpdateModelAsync/{id}", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

  }


  getPoDataList(objPoheader2: Poheader): any {
    var data = JSON.stringify(objPoheader2);
    return this.http.post("https://localhost:44353/api/PurchaseOrder/GetAllPoReportDetails/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }










}
  //purchaseordercolumnDefs = [];
  //purchaseordercolumnDefs2 = [];
  //purchaseordercolumnDefs3 = [];
  //purchaseordercolumnDefs4 = [];

  //purchaseorderRowData = [];
  //purchaseorderRowData2 = [];
  //purchaseorderRowData3 = [];
  //purchaseorderRowData4 = [];

  //getpurchaseordercolumnDefs() {
  //  this.purchaseordercolumnDefs = [
  //    { headerName: 'Request No', field: 'reqNo', width: 150, suppressMenu: true },
  //    { headerName: 'Item Category', field: 'itemCategory', width: 160, suppressMenu: true },
  //    { headerName: 'Make', field: 'make', width: 130, suppressMenu: true },
  //    { headerName: 'Model', field: 'model', width: 120, suppressMenu: true },
  //    { headerName: 'Request Qty', field: 'reqQty', width: 110, suppressMenu: true },
  //    { headerName: 'Priority Level', field: 'priorityLevel', width: 140, suppressMenu: true },
  //    {
  //      headerName: 'Select', field: 'check',
  //      width: 100,
  //      cellRendererParams: { checkbox: true },
  //      checkboxSelection: true,
  //      suppressMenu: true
  //    }
  //  ];
  //  return this.purchaseordercolumnDefs;
  //}

  //getpurchaseordercolumnDefs2() {
  //  this.purchaseordercolumnDefs2 = [
  //    { headerName: 'Name', field: 'name', width: 150, suppressMenu: true },
  //    { headerName: 'Supplier Type', field: 'supplyType', width: 160, suppressMenu: true },
  //    { headerName: 'Min Quantity', field: 'minQty', width: 130, suppressMenu: true },
  //    { headerName: 'Max Quantity', field: 'maxQty', width: 120, suppressMenu: true },
  //    { headerName: 'Payment Type', field: 'paymentType', width: 110, suppressMenu: true },
  //    { headerName: 'Contact No', field: 'contactNo', width: 140, suppressMenu: true },
  //    {
  //      headerName: 'Select',
  //      field: 'check',
  //      width: 100,
  //      cellRendererParams: { checkbox: true },
  //      checkboxSelection: true,
  //      suppressMenu: true
  //    }
  //  ];
  //  return this.purchaseordercolumnDefs2;
  //}

  //getpurchaseordercolumnDefs3() {
  //  this.purchaseordercolumnDefs3 = [
  //    { headerName: 'Item Name', field: 'itemName', width: 150, suppressMenu: true },
  //    { headerName: 'Make', field: 'make', width: 160, suppressMenu: true },
  //    { headerName: 'Model', field: 'model', width: 130, suppressMenu: true },
  //    { headerName: 'Quantity', field: 'quantity', width: 130, suppressMenu: true },
  //    { headerName: 'Quotation No', field: 'quatationNo', width: 130, suppressMenu: true },
  //    {
  //      headerName: 'Select', field: 'check',
  //      width: 100,
  //      cellRendererParams: { checkbox: true },
  //      checkboxSelection: true,
  //      suppressMenu: true
  //    }
  //  ];
  //  return this.purchaseordercolumnDefs3;
  //}

  //getpurchaseordercolumnDefs4() {
  //  this.purchaseordercolumnDefs4 = [
  //    { headerName: 'Unit Value', field: 'unitValue', width: 100, suppressMenu: true },
  //    { headerName: 'Tax Type', field: 'taxType', width: 100, suppressMenu: true },
  //    { headerName: 'Tax Amount', field: 'taxAmount', width: 100, suppressMenu: true },
  //    {
  //      headerName: 'Edit',
  //      cellRenderer: "buttonRenderer", width: 100, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Delete',
  //      cellRenderer: "deletebuttonRenderer", width: 100, suppressMenu: true
  //    }
  //  ];
  //  return this.purchaseordercolumnDefs4;
  //}

  

  //getpurchaseorderRowData() {
  //  this.purchaseorderRowData = [
  //    { reqNo: '001', itemCategory: 'Stationary', make: 'Atlas', model: 'Single rule', reqQty: ' 100', priorityLevel: '	Low', check: '' },
  //    { reqNo: '002', itemCategory: 'Electronic', make: 'Asus', model: 'Vivo Book', reqQty: ' 200', priorityLevel: 'Important', check: '' },
  //    { reqNo: '003', itemCategory: 'Electronic', make: 'Epson', model: 'L805', reqQty: ' 20', priorityLevel: '	Important', check: '' },
  //    { reqNo: '004', itemCategory: 'Electronic', make: 'Siger', model: 'LP223', reqQty: ' 400', priorityLevel: 'Critical', check: '' }
  //  ];

  //  return this.purchaseorderRowData;
  //}

  //getpurchaseorderRowData2() {
  //  this.purchaseorderRowData2 = [
  //    { name: 'Winsoft', supplyType: 'Exporters', minQty: '100', maxQty: '100', paymentType: 'Cash', contactNo: '0123456789', check: '' },
  //    { name: 'MD Gunasena', supplyType: 'Distributors', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' },
  //    { name: 'Unity', supplyType: 'Exporters', minQty: '100', maxQty: '1000', paymentType: 'Cash', contactNo: '0123456789', check: '' },
  //    { name: 'PC House', supplyType: 'Exporters', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' }
  //  ];

  //  return this.purchaseorderRowData2;
  //}
  
  //getpurchaseorderRowData3() {
  //  this.purchaseorderRowData3 = [
  //    { itemName: ' Laptop', make: 'Asus', model: 'Viva Book', quantity: '5', quatationNo: '001', check: '' },
  //    { itemName: ' Printer', make: 'Epson', model: 'L805', quantity: '2', quatationNo: '003', check: '' }
  //  ];

  //  return this.purchaseorderRowData3;
  //}

  //getpurchaseorderRowData4() {
  //  this.purchaseorderRowData4 = [
  //    { unitValue: '100', taxType: 'VAT', taxAmount: '50' },
  //    { unitValue: '200', taxType: 'NBT', taxAmount: '60' },
  //    { unitValue: '300', taxType: 'PT', taxAmount: '70' }
  //  ];

  //  return this.purchaseorderRowData4;
  //}
  


