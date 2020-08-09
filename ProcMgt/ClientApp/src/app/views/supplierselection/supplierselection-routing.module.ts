import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierselectionComponent } from './supplierselection.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierselectionComponent,
    data: {
      title: 'Supplier Selection'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierselectionRoutingModule { }
