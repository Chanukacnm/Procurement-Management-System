import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actionbutton-renderer',
  template: '<span><button (click)="invokeParentMethod()" class="btn btn-block btn-link" >Action</button></span>'
})
export class ActionbuttonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridActionCellClicked(this.params.node);
   
  }

  refresh(): boolean {
    return false;
  }

}
