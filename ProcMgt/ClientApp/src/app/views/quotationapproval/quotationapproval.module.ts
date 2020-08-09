import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { QuotationapprovalComponent } from './quotationapproval.component';
import { QuotationapprovalRoutingModule } from './quotationapproval-routing.module';
@NgModule({
  declarations: [QuotationapprovalComponent],
  imports: [
    FormsModule,
    CommonModule,
    QuotationapprovalRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class QuotationapprovalModule { }
