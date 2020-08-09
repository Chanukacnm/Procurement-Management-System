import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-secondeditbutton-renderer',
  template: `<span><button (click)="invokeParentMethod()"  style="padding:1px 1px; margin-bottom:5px;" class="btn btn-link">Edit</button></span>`
})
export class SecondeditbuttonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridSecondEditCellClicked(this.params.node);
  }

  refresh(): boolean {
    return false;
  }

}
