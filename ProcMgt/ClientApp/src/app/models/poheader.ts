import { Podetails } from './podetails';
import { Quotationrequestdetails } from './quotationrequestdetails';
import { Quotationerequestheader } from './quotationerequestheader';



export class Poheader {
  poHeaderID: string;
  quotationRequestHeaderID: string;
  poNumber: string;
  totalPoamount: number;
  requestedDeliveryDate: string;
  pODateTime: string;
  userID: string;
  isDeliver: boolean;
  actualDeliveryDate: string;
  paymentMethodID: string;
  taxAmount: number;

  isEnter: boolean;
  qty: number;
  userName: string;
  quotationNumber: string;
  paymentMethodName: string;
  itemDescription: string;

  itemID: string;

  podetail: Podetails[];
  //quotationRequestDetails: Quotationrequestdetails[];
  //quotationRequestHeader: Quotationerequestheader[];
}
