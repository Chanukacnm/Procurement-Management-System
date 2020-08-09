import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-attachedquo-renderer',
  template: '<span><button (click)="invokeParentMethod()" style="padding:0px 40px; margin-bottom:20px;" class="btn btn-warning" >Approve</button></span>'
})
export class PoapprovalpopupRendererComponent implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridAttachedCellClicked();
  }

  refresh(): boolean {
    return false;
  }

}
