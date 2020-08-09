import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { QuotationenterComponent } from './quotationenter.component';

const routes: Routes = [
  {
    path: '',
    component: QuotationenterComponent,
    data: {
      title: 'Quotationenter'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationenterRoutingModule { }
