import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserroleComponent } from './userrole.component';
import { UserroleRoutingModule } from './userrole-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [UserroleComponent],
  imports: [
    FormsModule,
    CommonModule,
    UserroleRoutingModule,
    AgGridModule
  ]
})
export class UserroleModule { }
