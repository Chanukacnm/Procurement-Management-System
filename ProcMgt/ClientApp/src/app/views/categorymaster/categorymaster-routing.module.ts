import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategorymasterComponent } from './categorymaster.component';

const routes: Routes = [
  {
    path: '',
    component: CategorymasterComponent,
    data: {
      title: 'Category Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorymasterRoutingModule { }
