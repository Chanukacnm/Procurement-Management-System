import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalscreenComponent } from './approvalscreen.component';


const routes: Routes = [
  {
    path: '',
    component: ApprovalscreenComponent,
    data: {
      title: 'Approval Screen'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalscreenRoutingModule { }
