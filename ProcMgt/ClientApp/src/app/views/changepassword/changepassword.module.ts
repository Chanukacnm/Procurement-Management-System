import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangepasswordComponent } from './changepassword.component';
import { ChangepasswordRoutingModule } from './changepassword-routing.module';

@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    FormsModule,
    CommonModule,
    ChangepasswordRoutingModule
  ]
})
export class ChangepasswordModule { }
