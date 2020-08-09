import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PurchaseorderComponent } from './purchaseorder.component';
import { PurchaseorderRoutingModule } from './purchaseorder-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { PoreportComponent } from '../poreport/poreport.component';


//import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';

 
@NgModule({
  declarations: [PurchaseorderComponent,PoreportComponent],
  imports: [
    FormsModule,
    CommonModule,
    PurchaseorderRoutingModule,
    AgGridModule
  ]
})
export class PurchaseorderModule { }
