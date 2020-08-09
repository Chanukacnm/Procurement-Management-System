import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { QuotationrequestComponent } from './quotationrequest.component';

const routes: Routes = [
  {
    path: '',
    component: QuotationrequestComponent,
    data: {
      title: 'Quotation Request'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationrequestRoutingModule { }
