import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PoapprovalComponent } from './poapproval.component';

const routes: Routes = [
  {
    path: '',
    component: PoapprovalComponent,
    data: {
      title: 'PO Approval'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoapprovalRoutingModule { }
