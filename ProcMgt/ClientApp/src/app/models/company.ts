import { Groupcompany } from './groupcompany';

export class company {
  companyID: string;
  companyName: string;
  companyCode: string;
  isActive: boolean;
  status: string;
  isGroupofCompany: boolean;
  companyStatus: string;
  companyLogoID: string;
  uploadFileName: string;
  companyAddressLine1: string;
  companyAddressLine2: string;
  companyAddressLine3: string;
  companyAddressLine4: string;
  companyTelephoneNo: number;
  companyFax: string;
  email: string;
  companyWeb: string;
  companyRegistrationNo: string;
  vatRegistrationNo: string;

  groupCompany: Groupcompany[];

}
