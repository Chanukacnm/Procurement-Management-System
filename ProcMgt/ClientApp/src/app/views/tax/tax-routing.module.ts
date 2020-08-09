import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TaxComponent } from './tax.component';

const routes: Routes = [
  {
    path: '',
    component: TaxComponent,
    data: {
      title: 'Tax'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
