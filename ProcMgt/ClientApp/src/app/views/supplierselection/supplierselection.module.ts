import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SupplierselectionComponent } from './supplierselection.component';
import { SupplierselectionRoutingModule } from './supplierselection-routing.module';

//import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
//import { RfqbuttonRenderer } from '../renderer/button-renderer/rfqbutton-renderer.component';
//import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';
//import { CheckboxsaveRenderer } from '../renderer/button-renderer/checkboxsave-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [SupplierselectionComponent],
  imports: [
    FormsModule,
    CommonModule,
    SupplierselectionRoutingModule,
    AgGridModule
  ]
})
export class SupplierselectionModule { }
