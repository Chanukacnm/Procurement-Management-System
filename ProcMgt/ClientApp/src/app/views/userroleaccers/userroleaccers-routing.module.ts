import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserroleaccersComponent } from './userroleaccers.component';

const routes: Routes = [
  {
    path: '',
    component: UserroleaccersComponent,
    data: {
      title: 'Accers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserroleaccersRoutingModule { }
