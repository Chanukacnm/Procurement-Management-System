import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationComponent } from './designation.component';
import { DesignationRoutingModule } from './designation-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DesignationComponent],
  imports: [
    CommonModule,
    FormsModule,
    DesignationRoutingModule,
    AgGridModule
  ]
})
export class DesignationModule { }
