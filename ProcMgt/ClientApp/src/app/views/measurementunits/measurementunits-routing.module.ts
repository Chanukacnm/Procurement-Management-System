import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MeasurementunitsComponent } from './measurementunits.component';

const routes: Routes = [
  {
    path: '',
    component: MeasurementunitsComponent,
    data: {
      title: 'Measurement Unit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementunitsRoutingModule { }
