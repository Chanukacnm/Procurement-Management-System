import { Quotationrequestdetails } from './quotationrequestdetails';

export class Quotationapproval {

  quotationRequestHeaderID: string;
  supplierID: string;
  quotationRequestedDate: string;
  quotationNumber: string;
  userID: string;
  requiredDate: string;
  quotationRequestStatusID: number;
 
  approvalComment: string;



  quotationRequestDetails: Quotationrequestdetails[];


  userName: string;
  supplierName: string;
  quotationRequestStatus1: string; 


}
