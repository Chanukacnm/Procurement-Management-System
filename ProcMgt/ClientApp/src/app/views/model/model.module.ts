import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModelComponent } from './model.component';
import { ModelRoutingModule } from './model-routing.module';

////import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
////import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [ModelComponent],
  imports: [
    FormsModule,
    CommonModule,
    ModelRoutingModule,
    AgGridModule
  ]
})
export class ModelModule { }
