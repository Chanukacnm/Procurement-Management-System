import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkboxsave-renderer',
  template: '<span><input type="checkbox" (click)="invokeParentMethod()" style="margin-left:20px; margin-top:3px; zoom: 1.5;"  ></span>'
})
export class CheckboxsaveRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridCheckSaveCellClicked(this.params.node.rowIndex, this.params.colDef.headerName);

  }

  refresh(): boolean {
    return false;
  }

}
