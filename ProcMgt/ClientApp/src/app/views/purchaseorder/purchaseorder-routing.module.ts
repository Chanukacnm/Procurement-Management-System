import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { PurchaseorderComponent } from './purchaseorder.component';
import { PoreportComponent } from '../poreport/poreport.component';

const routes: Routes = [
 
 
  {


    path: '',
    component: PurchaseorderComponent,
    data: {
      title: 'Purchase Order'
    }
    
  
  },
  {
    path: 'poreport',
    component: PoreportComponent,
    data: {
      title: 'PO Report'
    }
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseorderRoutingModule { }
