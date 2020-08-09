import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IssueComponent } from './issue.component';


const routes: Routes = [
  {
    path: '',
    component: IssueComponent,
    data: {
      title: 'Issue'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
