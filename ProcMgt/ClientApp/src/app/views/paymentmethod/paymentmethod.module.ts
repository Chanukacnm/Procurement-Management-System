import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaymentmethodComponent } from './paymentmethod.component';
import { PaymentmethodRoutingModule } from './paymentmethod-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [PaymentmethodComponent],
  imports: [
    FormsModule,
    CommonModule,
    PaymentmethodRoutingModule,
    AgGridModule
  ]
})
export class PaymentmethodModule { }
