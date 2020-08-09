import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-attachbutton-renderer',
  template: `<input type="file" name="pic"  style="padding:0px 10px; margin-right:10px; margin-left:10px; margin-bottom:2px; height: 25px;">`
})
export class AttachbuttonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  //public invokeParentMethod() {
  //  this.params.context.componentParent.GridAttachment();
  //}

  refresh(): boolean {
    return false;
  }

}
