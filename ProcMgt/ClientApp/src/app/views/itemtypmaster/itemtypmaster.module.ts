import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemtypmasterComponent } from './itemtypmaster.component';
import { ItemtypmasterRoutingModule } from './itemtypmaster-routing.module';

import { AgGridModule } from 'ag-grid-angular';
//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';


@NgModule({
  declarations: [ItemtypmasterComponent],
  imports: [
    FormsModule,
    CommonModule,
    ItemtypmasterRoutingModule,
    AgGridModule
  ]
})
export class ItemtypmasterModule { }
