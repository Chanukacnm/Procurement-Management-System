import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ApprovalflowmanagementComponent } from './approvalflowmanagement.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalflowmanagementComponent,
    data: {
      title: 'Approval Flow Management'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalflowmanagementRoutingModule { }
