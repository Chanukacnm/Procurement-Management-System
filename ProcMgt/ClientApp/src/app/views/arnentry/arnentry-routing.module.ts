import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArnentryComponent } from './arnentry.component';

const routes: Routes = [
  {
    path: '',
    component: ArnentryComponent,
    data: {
      title: 'ARN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArnentryRoutingModule { }
