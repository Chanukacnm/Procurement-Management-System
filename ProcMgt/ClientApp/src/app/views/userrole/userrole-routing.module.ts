import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserroleComponent } from './userrole.component';

const routes: Routes = [
  {
    path: '',
    component: UserroleComponent,
    data: {
      title: 'User Role'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserroleRoutingModule { }
