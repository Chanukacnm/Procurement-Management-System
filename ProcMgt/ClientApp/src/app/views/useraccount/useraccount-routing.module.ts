import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UseraccountComponent } from './useraccount.component';

const routes: Routes = [
  {
    path: '',
    component: UseraccountComponent,
    data: {
      title: 'User Account'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseraccountRoutingModule { }
