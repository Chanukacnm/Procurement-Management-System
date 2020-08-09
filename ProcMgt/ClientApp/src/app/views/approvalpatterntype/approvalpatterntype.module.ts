import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalpatterntypeComponent } from './approvalpatterntype.component';
import { ApprovalpatterntypeRoutingModule } from './approvalpatterntype-routing.module';
import { FormsModule } from '@angular/forms';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ApprovalpatterntypeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApprovalpatterntypeRoutingModule,
    AgGridModule
  ]
})
export class ApprovalpatterntypeModule { }
