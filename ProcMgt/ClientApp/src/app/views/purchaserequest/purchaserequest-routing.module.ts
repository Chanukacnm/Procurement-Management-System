import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PurchaserequestComponent} from './purchaserequest.component'


const routes: Routes = [
  {
    path: '',
    component: PurchaserequestComponent,
    data: {
      title: 'Item Request'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PurchaserequestRoutingModule { }
