import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueComponent } from './issue.component';
import { IssueRoutingModule } from './issue-routing.module';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [IssueComponent],
  imports: [
    FormsModule,
    CommonModule,
    IssueRoutingModule,
    AgGridModule
  ]
})
export class IssueModule { }
