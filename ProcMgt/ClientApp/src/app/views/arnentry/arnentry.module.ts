import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArnentryComponent } from './arnentry.component';
import { ArnentryRoutingModule } from './arnentry-routing.module';

import { AgGridModule } from 'ag-grid-angular';
//import { CheckboxRenderer } from '../renderer/button-renderer/checkbox-renderer.component';

@NgModule({
  declarations: [ArnentryComponent],
  imports: [
    FormsModule,
    CommonModule,
    ArnentryRoutingModule,
    AgGridModule
  ]
})
export class ArnentryModule { }
