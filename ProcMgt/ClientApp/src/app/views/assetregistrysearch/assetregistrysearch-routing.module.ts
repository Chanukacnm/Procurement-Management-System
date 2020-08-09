import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AssetregistrysearchComponent } from './assetregistrysearch.component';

const routes: Routes = [
  {
    path: '',
    component: AssetregistrysearchComponent,
    data: {
      title: 'Asset Registry Search'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetregistrysearchRoutingModule { }
