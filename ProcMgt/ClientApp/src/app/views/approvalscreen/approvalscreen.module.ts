import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApprovalscreenComponent } from './approvalscreen.component';
import { ApprovalscreenRoutingModule } from './approvalscreen-routing.module';

import { AgGridModule } from 'ag-grid-angular';
//import { ActionbuttonRenderer } from '../renderer/button-renderer/actionbutton-renderer.component';
//import { MoredetailsbuttonRenderer } from '../renderer/button-renderer/moredetailsbutton-renderer.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ApprovalscreenComponent],
  imports: [
    FormsModule,
    CommonModule,
    ApprovalscreenRoutingModule,
    AgGridModule
  ]
})
export class ApprovalscreenModule { }
