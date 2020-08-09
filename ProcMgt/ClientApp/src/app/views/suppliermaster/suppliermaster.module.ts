import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SuppliermasterComponent } from './suppliermaster.component';
import { SuppliermasterRoutingModule } from './suppliermaster-routing.module';

import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [SuppliermasterComponent],
  imports: [
    FormsModule,
    CommonModule,
    SuppliermasterRoutingModule,
    AgGridModule.withComponents()

  ]
})
export class SuppliermasterModule { }
