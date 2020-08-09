import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { ApprovalflowmanagementComponent } from './approvalflowmanagement.component';
import { ApprovalflowmanagementRoutingModule } from './approvalflowmanagement-routing.module';


@NgModule({
  declarations: [ApprovalflowmanagementComponent ],
  imports: [
    FormsModule,
    CommonModule,
    ApprovalflowmanagementRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class ApprovalflowmanagementModule { }
