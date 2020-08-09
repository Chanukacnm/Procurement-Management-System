import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentmethodComponent } from './paymentmethod.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentmethodComponent,
    data: {
      title: 'Payment Method'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentmethodRoutingModule { }
