import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemcategoryComponent } from './itemcategory.component';
import { ItemcategoryRoutingModule } from './itemcategory-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [ItemcategoryComponent],
  imports: [
    FormsModule,
    CommonModule,
    ItemcategoryRoutingModule,
    AgGridModule
  ]
})
export class ItemcategoryModule { }
