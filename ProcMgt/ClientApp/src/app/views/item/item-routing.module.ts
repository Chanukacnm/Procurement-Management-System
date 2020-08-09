import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';


const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    data: {
      title: 'Item'
    }
  }
];


@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }


