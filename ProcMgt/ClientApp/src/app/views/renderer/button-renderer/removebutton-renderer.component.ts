import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-removebutton-renderer',
  template: `<span><button (click)="invokeParentMethod()" style="padding:1px 1px; margin-bottom:5px;" class="btn btn-link">Remove</button></span>`
})
export class RemovebuttonRenderer implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridRemoveCellClicked(this.params.node);
  }

  refresh(): boolean {
    return false;
  }

  

}



