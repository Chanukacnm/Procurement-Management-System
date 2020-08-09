import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';




@Component({
  selector: 'app-button-renderer',

  //------- Cmd By Nipuna Francisku ------------
  //template: `<span><button [disabled]="params.node.data.enableButton" (click)="invokeParentMethod()" style="padding:1px 1px; margin-bottom:5px;" class="btn btn-link">Edit</button></span>`

  //------- Edited By Nipuna Francisku ---------
   template: `<span><button [disabled]="params.node.data.enableButton" (click)="invokeParentMethod()" style="padding:1px 1px; margin-bottom:5px;" class="btn btn-link">Edit</button></span>`
})
export class ButtonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridEditCellClicked(this.params.node);
  }

  refresh(): boolean {
    return false;
  }

}
