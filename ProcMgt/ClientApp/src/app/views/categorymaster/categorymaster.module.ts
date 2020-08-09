import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorymasterComponent } from'./categorymaster.component';
import { CategorymasterRoutingModule } from './categorymaster-routing.module';
import { FormsModule } from '@angular/forms';

//import { ButtonRenderer } from '../renderer/button-renderer/button-renderer.component';
//import { DeleteButtonRenderer } from '../renderer/button-renderer/deletebutton-renderer.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CategorymasterComponent],
  imports: [
    FormsModule,
    CommonModule,
    CategorymasterRoutingModule,
    AgGridModule
  ]
})
export class CategorymasterModule { }
