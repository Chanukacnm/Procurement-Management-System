import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { QuotationenterComponent } from './quotationenter.component';
import { QuotationenterRoutingModule } from './quotationenter-routing.module';




@NgModule({
  declarations: [QuotationenterComponent],
  imports: [
    FormsModule,
    CommonModule,
    QuotationenterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class QuotationenterModule { }
