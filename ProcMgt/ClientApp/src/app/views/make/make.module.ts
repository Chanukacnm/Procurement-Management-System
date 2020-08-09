import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MakeComponent } from './make.component';
import { MakeRoutingModule } from './make-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [MakeComponent],
  imports: [
    FormsModule,
    CommonModule,
    MakeRoutingModule,
    AgGridModule
  ]
})
export class MakeModule { }
