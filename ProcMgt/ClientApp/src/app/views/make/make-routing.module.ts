import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MakeComponent } from './make.component';

const routes: Routes = [
  {
    path: '',
    component: MakeComponent,
    data: {
      title: 'Make'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeRoutingModule { }
