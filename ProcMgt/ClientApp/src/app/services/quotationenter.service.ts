import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridTable } from '../models/datagridtable';
import { Quotationrequestdetails } from '../models/quotationrequestdetails';
import { Quotationerequestheader } from '../models/quotationerequestheader';


@Injectable({
  providedIn: 'root'
})
export class QuotationenterService {
  

  constructor(private http: HttpClient) { }


  getPendingQuotationReqdetailsGrid(): Observable<DataGridTable> {
    const url = 'https://localhost:44353/api/QuotationEnter/GetPendingQuotationRequestDetailsGrid';
    return this.http.get<DataGridTable>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getQuotatioDetailsGrid(objQuotationEnter): Observable<DataGridTable> {

    var data = JSON.stringify(objQuotationEnter);
    console.log("bbbc=>", objQuotationEnter)
   
    return this.http.post<DataGridTable>("https://localhost:44353/api/QuotationEnter/QuotationDetailsGrid", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }

  updateQuotationEnter(objQuotationrequestHeader: Quotationerequestheader): any {
    var data = JSON.stringify(objQuotationrequestHeader);
    
    console.log("tttt=>", objQuotationrequestHeader);

    return this.http.post("https://localhost:44353/api/QuotationRequestHeader/UpdateQuotationRequestDetailsrAsync/{id}", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }





  //getquotationEnterList() {

  //  this.quotationEnterList = [
  //    {
  //      quotationEnterID: "01", qutationRefNo: "", date: "", validity: "", paymentMethodID: "", creditPeriod: "", requierdAdvancePayment: "", warrantyPolicy: "",
  //      deliveryTerms: "", comments: "", unitValueWT: "", quantity: "", discountPerUnit: "", TaxID: "", taxAmount: "", availability: "", unitValueWithTax: "", taxdetails: []
  //    },
  //    {
  //      quotationEnterID: "02", qutationRefNo: "", date: "", validity: "", paymentMethodID: "", creditPeriod: "", requierdAdvancePayment: "", warrantyPolicy: "",
  //      deliveryTerms: "", comments: "", unitValueWT: "", quantity: "", discountPerUnit: "", TaxID: "", taxAmount: "", availability: "", unitValueWithTax: "", taxdetails: []
  //    },
  //    {
  //      quotationEnterID: "03", qutationRefNo: "", date: "", validity: "", paymentMethodID: "", creditPeriod: "", requierdAdvancePayment: "", warrantyPolicy: "",
  //      deliveryTerms: "", comments: "", unitValueWT: "", quantity: "", discountPerUnit: "", TaxID: "", taxAmount: "", availability: "", unitValueWithTax: "",taxdetails: []
  //    }
  //  ];
  //  return this.quotationEnterList;
  //}

  //QuotationEnterColumnDefs1 = []; 

  //getQuotationEnterColumnDefs1() {
  //  this.QuotationEnterColumnDefs1 = [
  //    { headerName: 'Request No', field: 'reqNo', width: 150, suppressMenu: true },
  //    { headerName: 'Item Category', field: 'itemCategory', width: 160, suppressMenu: true },
  //    { headerName: 'Make', field: 'make', width: 130, suppressMenu: true },
  //    { headerName: 'Model', field: 'model', width: 120, suppressMenu: true },
  //    { headerName: 'Request Qty', field: 'reqQty', width: 110, suppressMenu: true },
  //    { headerName: 'Priority Level', field: 'priorityLevel', width: 140, suppressMenu: true },
  //    {
  //      headerName: 'More Details',
  //      cellRenderer: "moredetailsbuttonRenderer", width: 130, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Select',
  //      field: 'select', width: 100, cellRendererParams: { checkbox: true }, checkboxSelection: true, suppressMenu: true
  //    }
  //  ];
  //  return this.QuotationEnterColumnDefs1;
  //}

  //QuotationEnterRowData1 = [];

  //getQuotationEnterRowData1() {
  //  this.QuotationEnterRowData1 = [
  //    { reqNo: '001', itemCategory: 'Stationary', make: 'Atlas', model: 'Single rule', reqQty: ' 100', priorityLevel: 'Low', select: '' },
  //    { reqNo: '002', itemCategory: 'Electronic', make: 'Asus', model: 'Vivo Book', reqQty: ' 200', priorityLevel: 'Important', select: '' },
  //    { reqNo: '003', itemCategory: 'Electronic', make: 'Epson', model: 'L805', reqQty: ' 10', priorityLevel: 'Important', select: '' },
  //    { reqNo: '004', itemCategory: 'Electronic', make: 'Siger', model: 'LP223', reqQty: ' 400', priorityLevel: 'Critical', select: '' }
  //  ];
  //  return this.QuotationEnterRowData1;
  //}

  //QuotationEnterColumnDefs2 = [];

  //getQuotationEnterColumnDefs2() {
  //  this.QuotationEnterColumnDefs2 = [
  //    { headerName: 'Name', field: 'name', width: 100, suppressMenu: true },
  //    { headerName: 'Supplier Type', field: 'supplyType', width: 100, suppressMenu: true },
  //    { headerName: 'Min Quantity', field: 'minQty', width: 100, suppressMenu: true },
  //    { headerName: 'Max Quantity', field: 'maxQty', width: 100, suppressMenu: true },
  //    { headerName: 'Payment Type', field: 'paymentType', width: 100, suppressMenu: true },
  //    { headerName: 'Contact No', field: 'contactNo', width: 110, suppressMenu: true },
  //    {
  //      headerName: 'Attached Quotation',
  //      cellRenderer: "QuotationattachedpopuptRenderer", width: 140, suppressMenu: true
  //    },
  //    {
  //      headerName: 'Quatation Details',
  //      cellRenderer: "quotationenterrenderer", width: 155, suppressMenu: true
  //    }
  //  ];
  //  return this.QuotationEnterColumnDefs2;
  //}

  //QuotationEnterRowData2 = [];

  //getQuotationEnterRowData2() {
  //  this.QuotationEnterRowData2 = [
  //    { name: 'Winsoft', supplyType: 'Exporters', minQty: '100', maxQty: '100', paymentType: 'Cash', contactNo: '0123456789', check: '' },
  //    { name: 'MD Gunasena', supplyType: 'Distributors', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' },
  //    { name: 'Unity', supplyType: 'Exporters', minQty: '100', maxQty: '1000', paymentType: 'Cash', contactNo: '0123456789', check: '' },
  //    { name: 'PC House', supplyType: 'Exporters', minQty: '100', maxQty: '1000', paymentType: 'Cheque', contactNo: '0123456789', check: '' }
  //  ];
  //  return this.QuotationEnterRowData2;
  //}

  //QuotationEnterColumnDefs3 = [];

  //getQuotationEnterColumnDefs3() {
  //  this.QuotationEnterColumnDefs3 = [
  //    { headerName: 'Item Name', field: 'itemName', width: 150, suppressMenu: true },
  //    { headerName: 'Item Category', field: 'itemCategory', width: 160, suppressMenu: true },
  //    { headerName: 'Assest Code', field: 'assestCode', width: 130, suppressMenu: true },
  //    { headerName: 'Number of unit', field: 'numberOfUnit', width: 120, suppressMenu: true },
  //    { headerName: 'Select', field: 'select', width: 100, cellRendererParams: { checkbox: true }, checkboxSelection: true, suppressMenu: true }
  //  ];
  //  return this.QuotationEnterColumnDefs3;
  //}

  //QuotationEnterRowData3 = [];

  //getQuotationEnterRowData3() {
  //  this.QuotationEnterRowData3 = [
  //    { itemName: 'Laptop', itemCategory: 'Electronic', assestCode: '1324', numberOfUnit: '10', select: '' },
  //    { itemName: 'Printer', itemCategory: 'Electronic', assestCode: '14125', numberOfUnit: '10', select: '' },
  //    { itemName: 'AC Machine', itemCategory: 'Electronic', assestCode: '4355', numberOfUnit: '04', select: '' },
     
  //  ];

  //  return this.QuotationEnterRowData3;
  //}

  //QuotationEnterColumnDefs4 = [];

  //getQuotationEnterColumnDefs4() {
  //  this.QuotationEnterColumnDefs4 = [
  //    { headerName: 'Tax Type', field: 'taxType', width: 150, suppressMenu: true },
  //    { headerName: 'Tax Ammount', field: 'taxAmmount', width: 160, suppressMenu: true }
  //  ];
  //  return this.QuotationEnterColumnDefs4;
  //}

  //QuotationEnterRowData4 = [];

  //getQuotationEnterRowData4() {
  //  this.QuotationEnterRowData4 = [
  //    { taxType: 'NBT', taxAmmount: '2000' },
  //    { taxType: 'NBBT', taxAmmount: '4000' },
  //    { taxType: 'NBT', taxAmmount: '4000' },
  //    { taxType: 'NBBT', taxAmmount: '6000' }
  //  ];
  //  return this.QuotationEnterRowData4;
  //}
} 
