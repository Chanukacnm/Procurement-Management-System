import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-deletebutton-renderer',
  template: `<span><button (click)="invokeParentMethod()" style="padding:1px 1px; margin-bottom:5px;" class="btn btn-block btn-link">Delete</button></span>`
})
export class SeconddeletebuttonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  } 

  public invokeParentMethod() {
    
    this.params.context.componentParent.GridSecondDeleteCellClicked(this.params.node, this.params.colDef.headerName);
  }

  refresh(): boolean {
    return false;
  }

  
}
