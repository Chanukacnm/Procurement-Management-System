import { Component, OnInit } from '@angular/core';
import { Suppliermaster } from '../../models/suppliermaster';
import { Contactdetails } from '../../models/contactdetails';
import { BankService } from '../../services/bank.service';
import { SupplierregistereditemsService } from '../../services/supplierregistereditems.service';
import { ItemtypeService } from '../../services/itemtype.service';
import { BranchService } from '../../services/branch.service';
import { AccounttypeService } from '../../services/accounttype.service';
import { SuppliermasterService } from '../../services/suppliermaster.service';
import { SuppliertypeService } from '../../services/suppliertype.service';
import { PaymentmethodService } from '../../services/paymentmethod.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { SeconddeletebuttonRenderer } from '../renderer/button-renderer/seconddeletebutton-renderer.component';
import { ThirddeletebuttonRenderer } from '../renderer/button-renderer/thirddeletebutton-renderer.component';
import { SecondeditbuttonRenderer } from '../renderer/button-renderer/secondeditbutton-renderer.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DataGridTable } from '../../models/datagridtable';
import { ContactdetailsService } from '../../services/contactdetails.service';
import { GridApi } from 'ag-grid-community';
import { Supplierregistereditems } from '../../models/supplierregistereditems';
import Swal from 'sweetalert2';
import { TreeError } from '@angular/compiler';


@Component({
  selector: 'app-suppliermaster',
  templateUrl: './suppliermaster.component.html',
  styleUrls: ['./suppliermaster.component.scss']
})
export class SuppliermasterComponent implements OnInit {

  private objSupplierMaster: Suppliermaster;
  private objDelSupplierMaster: Suppliermaster;
  private objContactDetails: Contactdetails;
  private objDelContactDetails: Contactdetails;
  private objisDefContactDetails: Contactdetails;
  private objSupplierRegisteredItems: Supplierregistereditems;
  private objDelSupplierRegisteredItems: Supplierregistereditems;
  private context;
  private frameworkComponents;
  private lstBank;
  private lstBranch;
  private lstAccount;
  private lstSupplierType;
  private lstSupplierItems;
  private lstSupplierCapacity;
  private lstSupplierMethod;
  private gridApi;
  private gridApi2;
  private gridApi3;
  private gridColumnApi;
  private gridColumnApi2;
  private gridColumnApi3;
  private selectedBank = '';
  private selectedPaymentMethod = '';
  private selectedBranch = '';
  private selectedAccountType = '';
  private selectedSupplierItemType = '';
  private selectedSupplierType = '';
  private isEditMode = false;
  private columnDefs;
  private rowData;
  private ContactDetailsColumnDefs;
  private ContactDetailsRowData;
  private supplierItemscolumnDefs;
  private supplierItemsRowData;
  private gridSupplierMaster: DataGridTable;
  private gridContactDetails: DataGridTable;
  private gridEditContactDetails: DataGridTable;
  private gridSupplierRegisteredItems: DataGridTable;
  //public show: boolean = true;
  public show2: boolean = false;
  public show: boolean = true;
  public contactDetailsList: any;
  public supItmList: any;


  private supplierID = '';
  private contactName = '';
  private contactMobile=null;
  private email = '';
  private isDefault = false;

  private minimumCapacity = '';
  private leadTime=null ;
  private itemTypeID = '';
  private itemTypeName = '';


  constructor(private bankService: BankService, private branchService: BranchService,
    private accountTypeService: AccounttypeService, private supplierTypeService: SuppliertypeService,
    private supplierRegisteredItemsService: SupplierregistereditemsService, private paymentMethodService: PaymentmethodService,
    private suplierMasterService: SuppliermasterService, private contactDetailsService: ContactdetailsService, private itemTypeService: ItemtypeService,
    private dialog: MatDialog)
  {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer,
      secondDeletebuttonRenderer: SeconddeletebuttonRenderer,
      thirdDeletebuttonRenderer: ThirddeletebuttonRenderer,
      secondEditbuttonRenderer: SecondeditbuttonRenderer
    }
  }

  ngOnInit() {
    this.objSupplierMaster = new Suppliermaster();
    this.objContactDetails = new Contactdetails();
    this.objSupplierRegisteredItems = new Supplierregistereditems();
    this.objSupplierMaster.contactDetails = [];
    this.objSupplierMaster.supplierRegisteredItems = [];
    this.objSupplierMaster.supplierName = "";
    this.objSupplierMaster.brNo = "";
    this.objSupplierMaster.address = "";
    this.objSupplierMaster.telephone= null ;
    this.objSupplierMaster.billingName = "";
    this.objSupplierMaster.billingAddress = "";
    this.objSupplierMaster.accountName = "";
    this.objSupplierMaster.accountNo = null;
    this.objSupplierMaster.isActive = false;
    this.objContactDetails.supplierID = "00000000-0000-0000-0000-000000000000";
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objSupplierMaster.userID = UserDet.userId;

    this.bankService.getbankList().subscribe(response => {
      this.lstBank = response;
    }, err => {
      //alert('in-Error - Bank');
    });

    this.paymentMethodService.getpaymentMethodList().subscribe(response => {
      this.lstSupplierMethod = response;
    }, err => {
      //alert('in-Error - payment method');
    });

    this.branchService.getbranchList().subscribe(response => {
      this.lstBranch = response;
    }, err => {
      //alert('in-Error - Branch');
      });

    this.accountTypeService.getaccountTypeList().subscribe(response => {
      this.lstAccount = response;
    }, err => {
      //alert('in-Error - Account Type');
      });

    this.itemTypeService.getItemTypeList().subscribe(response => {
      this.lstSupplierItems = response;
    }, err => {
      //alert('in-Error - Supplier Item Type');
      });

    this.supplierTypeService.getsupplierTypeList().subscribe(response => {
      this.lstSupplierType = response;
    }, err => {
      //alert('in-Error - Supplier type');
      });
    

    this.suplierMasterService.getSupplierMasterGrid().subscribe(response => {
      if (response) {
        this.gridSupplierMaster = new DataGridTable(response.rowSelection, response.enableSorting,
          response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
        this.CreateGridSupplierMaster(this.gridSupplierMaster);
      }
    });

    this.contactDetailsService.getContactList(this.objContactDetails)
      .subscribe(Response => {
        var result = Response;
        if (Response) {

          this.gridContactDetails = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridContactDetails(this.gridContactDetails);
        }
      });

    //if (this.isEditMode) {
    //  this.contactDetailsService.getEditContactDetailsGrid(this.objSupplierMaster).subscribe(response => {
    //    if (response) {
    //      this.gridEditContactDetails = new DataGridTable(response.rowSelection, response.enableSorting,
    //        response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
    //      this.CreateGridEditContactDetails(this.gridEditContactDetails);
    //    }
    //  });
    //}

    this.supplierRegisteredItemsService.getSupplierRegisteredItemsGrid(this.objSupplierRegisteredItems)
      .subscribe(response => {
        if (response) {

          this.gridSupplierRegisteredItems = new DataGridTable(response.rowSelection, response.enableSorting,
            response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
          this.CreateGridSupplierRegisteredItems(this.gridSupplierRegisteredItems);
        }
      });
   
  }

  CreateGridSupplierMaster(gridSupplierMaster: DataGridTable) {

    this.columnDefs = gridSupplierMaster.dataGridColumns;
    this.rowData = gridSupplierMaster.dataGridRows;

    this.columnDefs.push({
      headerName: 'Edit',
      cellRenderer: "buttonRenderer", width: 100, suppressMenu: true, lockPosition: true,
    });

    //this.columnDefs.push({
    //  headerName: 'Delete',
    //  cellRenderer: "deletebuttonRenderer", width: 70, suppressMenu: true
    //});

  }

  CreateGridContactDetails(gridContactDetails: DataGridTable) {
    this.ContactDetailsColumnDefs = gridContactDetails.dataGridColumns;

    //this.ContactDetailsRowData = gridContactDetails.dataGridRows;
    

    this.ContactDetailsColumnDefs.push({
      headerName: 'Delete',
      cellRenderer: "secondDeletebuttonRenderer", width: 100, suppressMenu: true
    }); 

  }

  //CreateGridEditContactDetails(gridEditContactDetails: DataGridTable) {
  //  this.ContactDetailsColumnDefs = gridEditContactDetails.dataGridColumns;
  //  this.ContactDetailsRowData = gridEditContactDetails.dataGridRows;
  //  console.log("cccv =>", this.ContactDetailsRowData);

  //  this.ContactDetailsColumnDefs.push({
  //    headerName: 'Edit',
  //    cellRenderer: "secondEditbuttonRenderer", width: 100, suppressMenu: true
  //  }); 
  //}

  CreateGridSupplierRegisteredItems(gridSupplierRegisteredItems: DataGridTable) {
    this.supplierItemscolumnDefs = gridSupplierRegisteredItems.dataGridColumns;

    this.supplierItemscolumnDefs.push({
      headerName: 'Delete',
      cellRenderer: "thirdDeletebuttonRenderer", width: 100, suppressMenu: true
    });
  }
  
  BankChanged(objBank) {
    //this.objSupplierMaster.bankID = this.selectedBank;
    this.selectedBank = objBank;
  }

  PaymentmethodChanged(objpaymentmethod) {
    //this.objSupplierMaster.paymentMethodID = this.selectedPaymentMethod;
    this.selectedPaymentMethod = objpaymentmethod
  }

  BranchChanged(objBranch) {
    //this.objSupplierMaster.branchID = this.selectedBranch;
    this.selectedBranch = objBranch;
  }

  AccountTypeChanged(objAccountType) {
    //this.objSupplierMaster.accountTypeID = this.selectedAccountType;
    this.selectedAccountType = objAccountType;
  }
  
  SupplierTypeChanged(objSupplierType) {
    //this.objSupplierMaster.supplierTypeID = this.selectedSupplierType;
    this.selectedSupplierType = objSupplierType;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    params.api.sizeColumnsToFit();
    
  }

  onGridReady2(params) {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;

    params.api.sizeColumnsToFit();    

  }

  onGridReady3(params) {
    this.gridApi3 = params.api;
    this.gridColumnApi3 = params.columnApi;

    params.api.sizeColumnsToFit();

  }

  GridSecondEditCellClicked(node) {
    console.log("bbbb =>", node.data);
    this.contactName = node.data.ContactName;
    this.contactMobile = node.data.ContactMobile;
    this.email = node.data.Email;
    this.isDefault = node.data.IsDefault;
    //this.objContactDetails.ContactDetailsID = node.data.ContactDetailsID;

  }
  

  GridEditCellClicked(node, Header) {
    this.isEditMode = true;
    this.show2 = true;
    this.show = false;
    console.log("aaa =>", node.data);
    this.objSupplierMaster.supplierID = node.data.SupplierID;
    this.objContactDetails.supplierID = node.data.SupplierID;
    this.objSupplierRegisteredItems.supplierID = node.data.SupplierID;


    this.contactDetailsService.getContactList(this.objContactDetails)
      .subscribe(Response => {
        var result = Response;
        this.gridContactDetails = new DataGridTable(result.rowSelection, result.enableSorting,
          result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
        this.CreateGridContactDetails(this.gridContactDetails);
        //console.log("wwww=>", Response);
        //console.log("qqqq=>", result.dataGridRows.length);

        //console.log("zzzz=>", this.objSupplierMaster.contactDetails);
        //this.objSupplierMaster.contactDetails = [];
        //console.log("xxxx=>", this.objSupplierMaster.contactDetails);
        this.objSupplierMaster.contactDetails = [];
        for (var i = 0; i < result.dataGridRows.length; i++) {
          //console.log("eeee=>", result.dataGridRows[i]);
          this.contactDetailsList = result.dataGridRows[i];
          this.objContactDetails = new Contactdetails();
          //console.log("gggg=>", this.contactDetailsList['ContactName']);
          //console.log("gggg=>", this.contactDetailsList['ContactMobile']);
          //console.log("gggg=>", this.contactDetailsList['Email']);
          //console.log("gggg=>", this.contactDetailsList['IsDefault']);
         

          this.objContactDetails.ContactName = this.contactDetailsList['ContactName'];
          this.objContactDetails.ContactMobile = this.contactDetailsList['ContactMobile'];
          this.objContactDetails.Email = this.contactDetailsList['Email'];
          this.objContactDetails.IsDefault = this.contactDetailsList['IsDefault'];

          //console.log("llll=>", this.objContactDetails);
          this.objSupplierMaster.contactDetails.push(this.objContactDetails);
          //console.log("kkkk=>", this.objSupplierMaster.contactDetails);
        }
        
        this.ContactDetailsRowData = this.objSupplierMaster.contactDetails;
        //if (this.ContactDetailsRowData == null) {
        //  this.ContactDetailsRowData = this.objSupplierMaster.contactDetails;
        //}
        //else {
        //  this.gridApi2.setRowData([]);
        //  //this.gridApi.updateRowData({ remove: this.ContactDetailsRowData });
        //  this.gridApi2.updateRowData({ add: this.ContactDetailsRowData });
        //}
        //console.log("jjjj=>", this.ContactDetailsRowData);

        //this.ContactDetailsRowData = result.dataGridRows;
      }, err => {
        //alert(' Error');
      });


    this.supplierRegisteredItemsService.getSupplierRegisteredItemsGrid(this.objSupplierRegisteredItems)
      .subscribe(response => {
        var result = response;

        this.gridSupplierRegisteredItems = new DataGridTable(result.rowSelection, result.enableSorting,
          result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
        this.CreateGridSupplierRegisteredItems(this.gridSupplierRegisteredItems);

        this.objSupplierMaster.supplierRegisteredItems = [];

        for (var i = 0; i < result.dataGridRows.length; i++) {
          //console.log("eeee=>", result.dataGridRows[i]);
          this.supItmList = result.dataGridRows[i];
          this.objSupplierRegisteredItems = new Supplierregistereditems();
          //console.log("gggg=>", this.supItmList['itemTypeName']);
          //console.log("gggg=>", this.supItmList['ItemTypeID']);
          //console.log("gggg=>", this.supItmList['MinimumItemCapacity']);
          //console.log("gggg=>", this.supItmList['SupplierLeadTime']);


          this.objSupplierRegisteredItems.MinimumItemCapacity = this.supItmList['MinimumItemCapacity'];
          this.objSupplierRegisteredItems.SupplierLeadTime = this.supItmList['SupplierLeadTime'];

          for (var j = 0; j < this.lstSupplierItems.length; j++) {
            if (this.lstSupplierItems[j].itemTypeID === this.supItmList['ItemTypeID']) {
              this.objSupplierRegisteredItems.ItemTypeId = this.lstSupplierItems[j].itemTypeID;
              this.objSupplierRegisteredItems.itemTypeName = this.lstSupplierItems[j].itemTypeName;
            }

          }

          //console.log("llll=>", this.objSupplierRegisteredItems);
          this.objSupplierMaster.supplierRegisteredItems.push(this.objSupplierRegisteredItems);
        }

        this.supplierItemsRowData = this.objSupplierMaster.supplierRegisteredItems;
        //console.log("jjjj=>", this.supplierItemsRowData);
      });



    this.objSupplierMaster.supplierName = node.data.SupplierName;
    this.objSupplierMaster.brNo = node.data.BrNo;
    this.objSupplierMaster.address = node.data.Address;
    this.objSupplierMaster.telephone = node.data.Telephone;
    this.objSupplierMaster.billingName = node.data.BillingName;
    this.objSupplierMaster.billingAddress = node.data.BillingAddress;

    this.objSupplierMaster.accountNo = node.data.AccountNo;
    this.objSupplierMaster.accountName = node.data.AccountName;

    this.objSupplierMaster.bankID = node.data.BankID;
    this.selectedBank = node.data.BankID;
    this.objSupplierMaster.branchID = node.data.BranchID;
    this.selectedBranch = node.data.BranchID;
    this.objSupplierMaster.accountTypeID = node.data.AccountTypeID;
    this.selectedAccountType = node.data.AccountTypeID;
    this.objSupplierMaster.paymentMethodID = node.data.PaymentMethodID;
    this.selectedPaymentMethod = node.data.PaymentMethodID;
    this.objSupplierMaster.supplierTypeID = node.data.SupplierTypeID;
    this.selectedSupplierType = node.data.SupplierTypeID;
    var stringValue = node.data.IsActive;
    var boolValue = getBoolean(stringValue);
    this.objSupplierMaster.isActive = boolValue;
    function getBoolean(value) {
      switch (value) {
        case true:
        case "True":
          return true;
        default:
          return false;
      }
    }
    //console.log(node.data.SupplierID);
    //console.log(this.objContactDetails.supplierID);


    //this.contactDetailsService.getEditContactDetailsGrid(this.objSupplierMaster).subscribe(response => {
    //  if (response) {
    //    this.gridEditContactDetails = new DataGridTable(response.rowSelection, response.enableSorting,
    //      response.enableFilter, response.enableColResize, response.suppressSizeToFit, response.dataGridColumns, response.dataGridRows);
    //    this.CreateGridEditContactDetails(this.gridEditContactDetails);
    //  }
    //});

    //this.contactDetailsService.getContactList(this.objContactDetails).subscribe(Response => {
    //  var result = Response;
    //  if (Response) {

    //    this.gridContactDetails = new DataGridTable(result.rowSelection, result.enableSorting,
    //      result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
    //    this.CreateGridContactDetails(this.gridContactDetails);
    //  }
    //})


  }

  GridDeleteCellClicked(node, Header) {
    
    this.objDelSupplierMaster = new Suppliermaster();
    this.objDelSupplierMaster = node.data;
    //console.log('bbbcc=>', this.objDelSupplierMaster);


    const dialogRef = this.dialog.open(DeletepopupComponent, {
      width: '500px',
      height: '265px ',
      position: {
        top: '',
        bottom: '',
        left: '460px',
        right: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log('bb=>', node.data);
        //console.log('Deleted...!');
        this.DeleteSupplierMaster(this.objDelSupplierMaster);
      }
    });
  }


  GridSecondDeleteCellClicked(node, Header, updateRowData) {
    
    this.objDelContactDetails = new Contactdetails();
    this.objDelContactDetails = node.data;

    for (var q = 0; q < this.objSupplierMaster.contactDetails.length; q++) {
      if (this.objSupplierMaster.contactDetails[q] === this.objDelContactDetails) {
        
        this.objSupplierMaster.contactDetails.splice(q, 1);
        q = this.objSupplierMaster.contactDetails.length;
        this.gridApi2.updateRowData({ remove: [this.objDelContactDetails] });
      }
    }//punsara
    this.objSupplierMaster.contactDetails.length - 1
   
    //console.log("list=>", this.objSupplierMaster.contactDetails);
    

  }

  GridThirdDeleteCellClicked(node, Header) {
    this.objDelSupplierRegisteredItems = new Supplierregistereditems();
    this.objDelSupplierRegisteredItems = node.data;

    for (var r = 0; r < this.objSupplierMaster.supplierRegisteredItems.length; r++) {
      if (this.objSupplierMaster.supplierRegisteredItems[r] === this.objDelSupplierRegisteredItems) {
        //console.log("qqqq=>", this.objSupplierMaster.supplierRegisteredItems);
        this.objSupplierMaster.supplierRegisteredItems.splice(r, 1);
        r = this.objSupplierMaster.supplierRegisteredItems.length;
        this.gridApi3.updateRowData({ remove: [this.objDelSupplierRegisteredItems] });
      }
    }

    console.log("list2=>", this.objSupplierMaster.supplierRegisteredItems);

  }


  DeleteSupplierMaster(objDelCategory) {
    this.suplierMasterService.deleteSupplierMaster(objDelCategory)
      .subscribe(Response => {

        //alert('in');
      }, err => {
        //alert('in-Error');
      });
  }

  SaveSupplierMaster() {
    
    if (this.objSupplierMaster.supplierName == "" || this.objSupplierMaster.brNo == "" || this.objSupplierMaster.address == "" || this.objSupplierMaster.telephone == null || this.objSupplierMaster.billingName == "" || this.objSupplierMaster.billingAddress == "" ||
      this.objSupplierMaster.contactDetails.length == 0 || this.selectedBank == "" || this.selectedBranch == "" || this.selectedAccountType == "" || this.objSupplierMaster.accountNo == null || this.objSupplierMaster.accountName == "" ||
      this.objSupplierMaster.supplierRegisteredItems.length == 0 || this.selectedPaymentMethod == "" || this.selectedSupplierType == "") {

      Swal.fire({

        icon: 'info',
        text: 'Please fill the mandatory fields',

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23'

      });

     
      return false;

    }

    this.suplierMasterService.saveSupplierMaster(this.objSupplierMaster, this.isEditMode)
      .subscribe(Response => {
        if (!this.isEditMode) {

          Swal.fire({
            icon: 'success',
            text: 'The record has been saved successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });
          //alert('The record has been saved successfully');
          var result = Response.resultObject;
          this.gridSupplierMaster = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridSupplierMaster(this.gridSupplierMaster);

          this.objSupplierMaster.supplierRegisteredItems = [];
          this.supplierItemsRowData = null;
          this.objSupplierMaster.contactDetails = [];
          this.ContactDetailsRowData = null;

          this.objSupplierMaster.supplierID = "00000000-0000-0000-0000-000000000000";
          this.objSupplierMaster.supplierName = "";
          this.objSupplierMaster.brNo = "";
          this.objSupplierMaster.address = "";
          this.objSupplierMaster.telephone = null;
          this.objSupplierMaster.billingName = "";
          this.objSupplierMaster.billingAddress = "";

          this.objSupplierMaster.bankID = "";
          this.selectedBank = "";
          this.objSupplierMaster.branchID = "";
          this.selectedBranch = "";
          this.objSupplierMaster.accountTypeID = "";
          this.selectedAccountType = "";
          this.objSupplierMaster.accountNo = null;
          this.objSupplierMaster.accountName = "";

          this.objSupplierMaster.paymentMethodID = "";
          this.selectedPaymentMethod = "";
          this.objSupplierMaster.supplierTypeID = "";
          this.selectedSupplierType = "";
          this.objSupplierMaster.isActive = false;
        }
        else {

          Swal.fire({
            icon: 'success',
            text: 'Records have been updated successfully',

            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#61CD23'

          });

          //alert('Records have been updated successfully');
          var result = Response.resultObject;
          this.gridSupplierMaster = new DataGridTable(result.rowSelection, result.enableSorting,
            result.enableFilter, result.enableColResize, result.suppressSizeToFit, result.dataGridColumns, result.dataGridRows);
          this.CreateGridSupplierMaster(this.gridSupplierMaster);

          this.objSupplierMaster.supplierRegisteredItems = [];
          this.supplierItemsRowData = null;
          this.objSupplierMaster.contactDetails = [];
          this.ContactDetailsRowData = null;

          this.objSupplierMaster.supplierID = "00000000-0000-0000-0000-000000000000";
          this.objSupplierMaster.supplierName = "";
          this.objSupplierMaster.brNo = "";
          this.objSupplierMaster.address = "";
          this.objSupplierMaster.telephone = null;
          this.objSupplierMaster.billingName = "";
          this.objSupplierMaster.billingAddress = "";

          this.objSupplierMaster.bankID = "";
          this.selectedBank = "";
          this.objSupplierMaster.branchID = "";
          this.selectedBranch = "";
          this.objSupplierMaster.accountTypeID = "";
          this.selectedAccountType = "";
          this.objSupplierMaster.accountNo = null;
          this.objSupplierMaster.accountName = "";

          this.objSupplierMaster.paymentMethodID = "";
          this.selectedPaymentMethod = "";
          this.objSupplierMaster.supplierTypeID = "";
          this.selectedSupplierType = "";
          this.objSupplierMaster.isActive = false;
          this.isEditMode = false;

          this.show2 = false;
          this.show = true;

        }
      }, err => {
        //alert('Save Unsuccessfull');
      });

  }
 
  AddContactDetails() {
    if (this.contactName == "" || this.contactMobile == null) {
      alert('Please fill the mandatory fields');
      return false;
    }
    this.objContactDetails = new Contactdetails();
    this.objContactDetails.ContactName = this.contactName;
    this.objContactDetails.ContactMobile = this.contactMobile;
    this.objContactDetails.Email = this.email;
    this.objContactDetails.IsDefault = this.isDefault;
    

    if (this.objSupplierMaster.contactDetails.length == 0) {
      this.objContactDetails.IsDefault = true;
      this.objSupplierMaster.contactDetails.push(this.objContactDetails);
      this.ContactDetailsRowData = this.objSupplierMaster.contactDetails;
      this.gridApi2.setRowData([]);
      this.gridApi2.updateRowData({ add: this.ContactDetailsRowData });
      this.gridContactDetails.dataGridRows = this.objSupplierMaster.contactDetails;
      
      this.gridApi2.redrawRows();
      //reset form
      this.contactName = "";
      this.contactMobile = null;
      this.email = "";
      this.isDefault = false;
    }
    else if (this.objContactDetails.IsDefault == true) {
      Swal.fire({

        icon: 'question',
        text: "Already have a default contact person for this Supplier. Are you sure you want to change?",

        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#61CD23',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',

      }).then((result) => {

        if (result.value == true) {

          for (var q = 0; q < this.objSupplierMaster.contactDetails.length; q++) {


            this.objSupplierMaster.contactDetails[q].IsDefault = false;

          }
          this.objSupplierMaster.contactDetails.push(this.objContactDetails);

          if (this.ContactDetailsRowData == null) {

            this.ContactDetailsRowData = this.objSupplierMaster.contactDetails;
          }
          else {

            this.gridApi2.setRowData([]);

            this.gridApi2.updateRowData({ add: this.ContactDetailsRowData });

          }
          this.gridContactDetails.dataGridRows = this.objSupplierMaster.contactDetails;

          this.gridApi2.redrawRows();
          //reset form
          this.contactName = "";
          this.contactMobile = null;
          this.email = "";
          this.isDefault = false;
          
          return;
        }

      });
    }
    else 
    {
      this.objSupplierMaster.contactDetails.push(this.objContactDetails);

      if (this.ContactDetailsRowData == null) {

        this.ContactDetailsRowData = this.objSupplierMaster.contactDetails;
      }
      else {

        this.gridApi2.setRowData([]);

        this.gridApi2.updateRowData({ add: this.ContactDetailsRowData });

      }
      this.gridContactDetails.dataGridRows = this.objSupplierMaster.contactDetails;
      //console.log("ssss=>", this.objContactDetails);


      this.gridApi2.redrawRows();
      //reset form
      this.contactName = "";
      this.contactMobile = null;
      this.email = "";
      this.isDefault = false;
    }
  }

  AddSupplierRegisteredItems() {
    if (this.selectedSupplierItemType == "" || this.minimumCapacity == "" || this.leadTime == null) {
      alert('Please fill the mandatory fields');
      return false;
    }
    this.objSupplierRegisteredItems = new Supplierregistereditems();
    this.objSupplierRegisteredItems.MinimumItemCapacity = this.minimumCapacity;
    this.objSupplierRegisteredItems.SupplierLeadTime = this.leadTime;
    //this.objSupplierRegisteredItems.ItemTypeId = this.selectedSupplierItemType;

    for (var i = 0; i < this.lstSupplierItems.length; i++) {
      if (this.lstSupplierItems[i].itemTypeID === this.selectedSupplierItemType) {
        this.objSupplierRegisteredItems.ItemTypeId = this.lstSupplierItems[i].itemTypeID;
        this.objSupplierRegisteredItems.itemTypeName = this.lstSupplierItems[i].itemTypeName;
      }
      
    }


    this.objSupplierMaster.supplierRegisteredItems.push(this.objSupplierRegisteredItems);
    
    if (this.supplierItemsRowData == null) {
      this.supplierItemsRowData = this.objSupplierMaster.supplierRegisteredItems;
    }
    else {
      this.gridApi3.setRowData([]);
      //this.gridApi.updateRowData({ remove: this.supplierItemsRowData });
      this.gridApi3.updateRowData({ add: this.objSupplierMaster.supplierRegisteredItems });
    }
    
    this.gridApi3.redrawRows();

    //reset form
    this.minimumCapacity = "";
    this.leadTime = null;
    this.selectedSupplierItemType = "";
    

    //console.log("llll=>", this.objSupplierRegisteredItems);
    //console.log("pppp=>", this.objSupplierMaster);
  }

  reset() {
    this.objSupplierMaster.supplierRegisteredItems = [];
    this.supplierItemsRowData = null;
    this.objSupplierMaster.contactDetails = [];
    this.ContactDetailsRowData = null;

    this.objSupplierMaster.supplierID = "00000000-0000-0000-0000-000000000000";
    this.objSupplierMaster.supplierName = "";
    this.objSupplierMaster.brNo = "";
    this.objSupplierMaster.address = "";
    this.objSupplierMaster.telephone = null;
    this.objSupplierMaster.billingName = "";
    this.objSupplierMaster.billingAddress = "";

    this.objSupplierMaster.bankID = "";
    this.selectedBank = "";
    this.objSupplierMaster.branchID = "";
    this.selectedBranch = "";
    this.objSupplierMaster.accountTypeID = "";
    this.selectedAccountType = "";
    this.objSupplierMaster.accountNo = null;
    this.objSupplierMaster.accountName = "";

    this.objSupplierMaster.paymentMethodID = "";
    this.selectedPaymentMethod = "";
    this.objSupplierMaster.supplierTypeID = "";
    this.selectedSupplierType = "";

    this.isEditMode = false;
    this.objSupplierMaster.isActive = false;

    this.show2 = false;
    this.show = true;


  }

}
