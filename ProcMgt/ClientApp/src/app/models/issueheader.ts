import { Issuedetails } from './issuedetails';

export class Issueheader {
  issuedHeaderID: string;
  itemRequestID: string
  issuedDateTime: string;
  issuedUserID: string;
  comment: string;

  receivedQty: number;

  issueDetails: Issuedetails[];
}
