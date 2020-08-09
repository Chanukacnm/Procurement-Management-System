import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemgroupComponent } from './itemgroup.component';

const routes: Routes = [
  {
    path: '',
    component: ItemgroupComponent,
    data: {
      title: 'Itemgroup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemgroupRoutingModule {}
