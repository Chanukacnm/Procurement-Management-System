import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-cancelbutton-renderer',
  template: '<span><button (click)="invokeParentMethod()" class="btn btn-block btn-link" >Cancel</button></span>'
})
export class CancelbuttonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridCancelCellClicked(this.params.node);
  }

  refresh(): boolean {
    return false;
  }

}
