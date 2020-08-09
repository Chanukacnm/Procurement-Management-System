import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemtypmasterComponent } from './itemtypmaster.component';


const routes: Routes = [
  {
    path: '',
    component: ItemtypmasterComponent,
    data: {
      title: 'Item Type Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemtypmasterRoutingModule { }
