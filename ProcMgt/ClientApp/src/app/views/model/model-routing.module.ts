import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModelComponent } from './model.component';

const routes: Routes = [
  {
    path: '',
    component: ModelComponent,
    data: {
      title: 'Model'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
