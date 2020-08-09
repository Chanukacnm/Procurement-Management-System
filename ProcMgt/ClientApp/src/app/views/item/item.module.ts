import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemComponent } from './item.component';
import { ItemRoutingModule } from './item-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    FormsModule,
    CommonModule,
    ItemRoutingModule,
    AgGridModule
  ]
})
export class ItemModule { }



