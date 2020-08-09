import { Designationbusinessunit } from './designationbusinessunit';

export class User {
  userID: string;
  employeeNo: string;
  name: string;
  companyID: string;
  departmentID: string;
  email: string;
  designationID: string;
  userRoleID: string;
  isActive: boolean;
  userName: string;
  password: string;
  dateTime: string;
  isApprovalUser: boolean;

  userRoleName: string; 
  departmentName: string;
  designationName: string;

  apprDesignationID: string;
  businessUnitTypeID: string;
  businessUnitsID: string;
  businessUnitTypeName: string;
  businessUnitsName: string;

  designationbusinessunit: Designationbusinessunit[];


}
