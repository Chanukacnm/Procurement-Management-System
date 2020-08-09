import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemcategoryComponent } from './itemcategory.component';

const routes: Routes = [
  {
    path: '',
    component: ItemcategoryComponent,
    data: {
      title: 'Itemcategory'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemcategoryRoutingModule { }

