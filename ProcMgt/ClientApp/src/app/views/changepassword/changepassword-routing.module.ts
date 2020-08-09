import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword.component';

const routes: Routes = [
  {
    path: '',
    component: ChangepasswordComponent,
    data: {
      title: 'Change Password'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangepasswordRoutingModule { }
