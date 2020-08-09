import { Arndetail } from './arndetail';
import { Podetails } from './podetails';
import {Poheader} from './poheader';

export class Arnheader {
  arnheaderID: string;
  poheaderID: string;
  arnnumber: string;
  recivedDate: string;
  invoiceNo: string;
  invoiceAtt: string;
  arnremark: string;
  

  arndetail: Arndetail[];
  arndetailResource: Arndetail[];



  arndetailID: string;
  invoiceQty: number;
  recivedQty: number;
  rejectedQty: number;
  remark: string;
  itemID: string[];
  qty: number[] ;
  itemDescription: string[];
} 
