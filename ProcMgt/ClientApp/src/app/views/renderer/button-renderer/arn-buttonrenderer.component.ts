import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';




@Component({
  selector: 'app-button-renderer',
  template: `<span><button (click)="invokeParentMethod()"  style="padding:1px 1px; margin-bottom:5px;" class="btn btn-link">ARN</button></span>`
})
export class ArnButtonrenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridARNCellClicked(this.params.node);
  }

  refresh(): boolean {
    return false;
  }

}

