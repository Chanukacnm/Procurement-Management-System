import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserroleaccersComponent } from './userroleaccers.component';
import { UserroleaccersRoutingModule } from './userroleaccers-routing.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [UserroleaccersComponent],
  imports: [
    FormsModule,
    CommonModule,
    UserroleaccersRoutingModule,
    AgGridModule
  ]
})
export class UserroleaccersModule { }
