import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MeasurementunitsComponent } from './measurementunits.component';
import { MeasurementunitsRoutingModule } from './measurementunits-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [MeasurementunitsComponent],
  imports: [
    FormsModule,
    CommonModule,
    MeasurementunitsRoutingModule,
    AgGridModule
  ]
})
export class MeasurementunitsModule { }
