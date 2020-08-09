import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuotationapprovalComponent } from './quotationapproval.component';

const routes: Routes = [
  {
    path: '',
    component: QuotationapprovalComponent,
    data: {
      title: 'Quotationapproval'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationapprovalRoutingModule { }
