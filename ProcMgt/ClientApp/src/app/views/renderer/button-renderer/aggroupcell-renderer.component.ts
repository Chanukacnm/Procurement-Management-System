import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-aggroupcell-renderer',
  template: '<span><input type="checkbox" id="check" (click)="invokeParentMethod(this.id)" style="margin-left:20px; margin-top:3px; zoom: 1.5;"  ></span>'
})
export class AggroupcellRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod(id) {
    this.params.context.componentParent.AGCheckCellClicked(this.params.node.rowIndex, this.params.colDef.headerName,id);
  }

  refresh(): boolean {
    return false;
  }

}
