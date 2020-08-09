import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DataGridTable } from '../../models/datagridtable';
//import { Router } from '@angular/router';
//import { Userroleaccers } from '../../models/userroleaccers';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { Rolemenualter } from '../../models/rolemenualter';
import { UserroleaccersService } from '../../services/userroleaccers.service';
import { UserroleService } from '../../services/userrole.service';
import { MatDialog } from '@angular/material';
import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { Rolemenu } from '../../models/rolemenu';
import { window } from 'ngx-bootstrap/utils/public_api';
import { Route } from '@angular/compiler/src/core';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import Swal from 'sweetalert2';
//import { type } from 'os';

@Component({
  selector: 'app-userroleaccers',
  templateUrl: './userroleaccers.component.html',
  styleUrls: ['./userroleaccers.component.scss']
})
export class UserroleaccersComponent implements OnInit {



  private gridApi;
  private gridColumnApi;
  private context;
  private frameworkComponents;
  private GridAccers: DataGridTable;
  private objiteuserroleaccers: Rolemenualter;
  private isEditMode = false;
  private isdelete = true;

  private lstUserrole;
  private lstMenu;

  isChecked: boolean = false;
  checkAll: boolean = false;

  select: boolean = false;
  select1: boolean = false;
  select2: boolean = false;
  


  selecteduUserRole: ' ';
  selectedMenu: ' ';
  resultText: any;
  objrolemenu: Rolemenu;
  objmenu: Menu;
  ListResult = new Array<number>(25);
  listresult = new Array<number>(25);
  //private objAccers: UserR;
  mySubscription: any;

  constructor(public dialog: MatDialog, private userroleService: UserroleService,
    private userroleaccersService: UserroleaccersService, private menuService: MenuService,) {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderer,
      deletebuttonRenderer: DeleteButtonRenderer
    }
  }

  

  ngOnInit() {

    this.objiteuserroleaccers = new Rolemenualter();
    this.objmenu = new Menu();
    this.objrolemenu = new Rolemenu();
    this.objiteuserroleaccers.menuID = [];
    this.objiteuserroleaccers.userRoleID = '';


    this.userroleService.getuserRoleList().subscribe(response => {
      this.lstUserrole = response;
    }, err => {
      //alert('in-Error - User Role');
      });

    this.menuService.getMenuList().subscribe(responce => {
      console.log(responce);

      

      this.lstMenu = responce;
      
       
    }, err => {
      //alert('in-Error - Menu');

    });
  }

 
  UserRoleChanged(userRoleID) {
    this.select1 = true;
    this.select = false;

    this.objiteuserroleaccers.menuID = [];
    console.log("User Role ID", userRoleID);

    this.menuService.getMenuList().subscribe(responce => {
      console.log(responce);

      
      this.lstMenu = responce;
     

    }, err => {
      //alert('in-Error - Menu');

    });

    //get the menuid list to check all select checkboxex
    this.userroleaccersService.getmenuByID(userRoleID)
      .subscribe(menuidlist => {


       
        //console.log("Response", menuidlist);


        this.ListResult = menuidlist;
        

        for (var i = 0; i < this.ListResult.length; i++) {
          this.objiteuserroleaccers.menuID.push(this.ListResult[i]);
        }
        //console.log("Response2", this.ListResult);

      }, err => {

        //alert('in- error');

      });
  }


  MenuChange(menuID, event) {

    if (event.target.checked) {
      
      if (this.objiteuserroleaccers.menuID.indexOf((menuID)) < 0 ){
        this.objiteuserroleaccers.menuID.push(menuID);
        console.log(this.objiteuserroleaccers.menuID);
      }

    } else {
      
      if (this.objiteuserroleaccers.menuID.indexOf((menuID)) > -1) {
        this.objiteuserroleaccers.menuID.splice(this.objiteuserroleaccers.menuID.indexOf((menuID)), 1);
        console.log(this.objiteuserroleaccers.menuID);
      }
    }

    //var list = this.objiteuserroleaccers.menuID.push(listresult);
    return (this.objiteuserroleaccers);
  }


  allselect(event) {

    
    this.select1 = false;


    
    if (event.target.checked) {
     
      this.select = true;

      for (var menu of this.lstMenu) {

        if (this.objiteuserroleaccers.menuID.indexOf((menu.menuID)) > -1) {
          this.objiteuserroleaccers.menuID.splice(this.objiteuserroleaccers.menuID.indexOf((menu.menuID)), 1);
          console.log(this.objiteuserroleaccers.menuID);
        }


        this.objiteuserroleaccers.menuID.push(menu.menuID);
      }
    } 

    else{
      this.select = false;

      for (var menu of this.lstMenu) {

        if (this.objiteuserroleaccers.menuID.indexOf((menu.menuID)) > -1) {
          this.objiteuserroleaccers.menuID.splice(this.objiteuserroleaccers.menuID.indexOf((menu.menuID)), 1);
          console.log(this.objiteuserroleaccers.menuID);
        }

      }
    }


    console.log(this.objiteuserroleaccers);
    return (this.objiteuserroleaccers);

    
  }



  SaveRoleMenu() {

    console.log(this.objiteuserroleaccers);

    this.userroleaccersService.deleteandsave(this.objiteuserroleaccers)
      .subscribe(response => {


        Swal.fire({

          text: 'The record has been saved successfully',

          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#61CD23',
          icon: 'success',

        });
      
        //this.userroleaccersService.saveUserroleaccers(this.objiteuserroleaccers)
        //  .subscribe(response => {

        //    alert('Saved successfully');

        //  }, err => {
        //    alert('Save Failed');
        //  });

        //alert('The record has been saved successfully');

      }, err => {
        //alert('Update Fail');
      });


    //this.userroleaccersService.saveUserroleaccers(this.objiteuserroleaccers)
    //  .subscribe(response => {

    //    alert('Saved successfully');

    //  }, err => {
    //    alert('Save Failed');
    //  });
  }

}
