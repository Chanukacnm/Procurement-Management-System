import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaxComponent } from './tax.component';
import { TaxRoutingModule } from './tax-routing.module';

import { AgGridModule } from 'ag-grid-angular';
//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';

@NgModule({
  declarations: [TaxComponent],
  imports: [
    FormsModule,
    CommonModule,
    TaxRoutingModule,
    AgGridModule
  ]
})
export class TaxModule { }
