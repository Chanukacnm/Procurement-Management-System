import { Quotationrequestdetails } from './quotationrequestdetails';

export class Quotationerequestheader {
  quotationRequestHeaderID: string;
  supplierID: string;
  quotationRequestedDate: string;
  quotationNumber: string;
  userID: string;
  requiredDate: string;
  quotationRequestStatusID: string;
  isEnteringCompleted: boolean;
  isDelivered: boolean;
  
  approvalComment: string;

  quotationRequestDetails: Quotationrequestdetails[];


  userName: string;
  supplierName: string;
  quotationRequestStatus1: string; 
}
