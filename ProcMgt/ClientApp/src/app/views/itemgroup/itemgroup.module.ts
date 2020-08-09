import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemgroupComponent } from './itemgroup.component';
import { ItemgroupRoutingModule } from './itemgroup-routing.module';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer} from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ItemgroupRoutingModule,
    AgGridModule

  ],
  declarations: [ItemgroupComponent]
})

export class ItemgroupModule { }
