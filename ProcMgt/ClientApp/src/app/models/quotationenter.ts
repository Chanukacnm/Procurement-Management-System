import { Taxdetails } from './taxdetails';
export class Quotationenter {
  
  quotationEnterID: string;
  qutationRefNo: string;
  date: string;
  validity: string;
  paymentMethodID: string;
  creditPeriod: string;
  requierdAdvancePayment: string;
  warrantyPolicy: string;
  comments: string;
  //itemList: string;
  unitValueWT: string;
  quantity: string;
  discountPerUnit: string;
  TaxID: string;
  taxAmount: string;
  availability: string;
  unitValueWithTax: string;
  deliveryTerms: string;
  //TaxName: string;
  //paymentMethodName: string;

  taxdetails: Taxdetails[];
}
