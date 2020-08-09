import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PurchaserequestComponent } from './purchaserequest.component';
import { PurchaserequestRoutingModule } from './purchaserequest-routing.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PurchaserequestComponent],
  imports: [
    FormsModule,
    CommonModule,
    PurchaserequestRoutingModule,
    AgGridModule.withComponents()

  ]
})
export class PurchaserequestModule { }
