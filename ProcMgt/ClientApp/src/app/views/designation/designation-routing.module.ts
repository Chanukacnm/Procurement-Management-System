import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';

const routes: Routes = [
  {
    path: '',
    component: DesignationComponent,
    data: {
      title: 'Designation Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
