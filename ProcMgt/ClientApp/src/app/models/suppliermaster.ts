import { Contactdetails } from './contactdetails';
import { Supplierregistereditems } from './supplierregistereditems';

export class Suppliermaster {
  supplierID: string;
  supplierName: string;
  brNo: string;
  address: string;
  telephone: number;
  billingName: string;
  billingAddress: string;
  bankID: string;
  branchID: string;
  accountTypeID: string;
  accountNo: number;
  accountName: string;
  supplierTypeID: string;
  paymentMethodID: string;
  isActive: boolean;
  userID: string;
  entryDateTime: string;

  contactDetails: Contactdetails[];
  supplierRegisteredItems: Supplierregistereditems[];
}


