import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoapprovalComponent } from './poapproval.component';
import { PoapprovalRoutingModule } from './poapproval-routing.module';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PoapprovalComponent],
  imports: [
    CommonModule,
    FormsModule,
    PoapprovalRoutingModule,
    AgGridModule
  ]
})
export class PoapprovalModule { }
