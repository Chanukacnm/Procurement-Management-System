import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    CompanyRoutingModule,
    AgGridModule
  ]
})
export class CompanyModule { }
