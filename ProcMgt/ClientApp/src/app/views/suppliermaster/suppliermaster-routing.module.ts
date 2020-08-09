import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SuppliermasterComponent } from './suppliermaster.component';


const routes: Routes = [
  {
    path: '',
    component: SuppliermasterComponent,
    data: {
      title: 'Supplier Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliermasterRoutingModule { }
