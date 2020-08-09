import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalpatterntypeComponent } from './approvalpatterntype.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalpatterntypeComponent,
    data: {
      title: 'Approval Pattern type'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalpatterntypeRoutingModule { }
