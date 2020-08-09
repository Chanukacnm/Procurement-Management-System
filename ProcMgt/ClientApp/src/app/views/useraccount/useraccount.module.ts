import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UseraccountComponent } from './useraccount.component';
import { UseraccountRoutingModule } from './useraccount-routing.module';

import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [UseraccountComponent],
  imports: [
    FormsModule,
    CommonModule,
    UseraccountRoutingModule,
    AgGridModule
  ]
})
export class UseraccountModule { }
