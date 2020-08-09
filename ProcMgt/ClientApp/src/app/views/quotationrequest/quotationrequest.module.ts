import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuotationrequestComponent } from './quotationrequest.component';
import { QuotationrequestRoutingModule } from './quotationrequest-routing.module';

//import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
//import { RfqbuttonRenderer } from '../renderer/button-renderer/rfqbutton-renderer.component';
//import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [QuotationrequestComponent],
  imports: [
    FormsModule,
    CommonModule,
    QuotationrequestRoutingModule,
    AgGridModule
  ]
})
export class QuotationrequestModule { }
