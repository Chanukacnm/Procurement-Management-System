import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    FormsModule,
    CommonModule,
    DepartmentRoutingModule,
    AgGridModule
  ]
})
export class DepartmentModule { }
