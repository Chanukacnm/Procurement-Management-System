import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox-renderer',
  template: '<span><input type="checkbox" name="cb" (change)="invokeParentMethod($event)"  style="margin-left:20px; margin-top:3px; zoom: 1.5;" ></span> '
 


})
export class CheckboxRenderer implements ICellRendererAngularComp {

  public params: any;
  
  

  agInit(params: any ): void {
    this.params = params;
    
  }

  public invokeParentMethod() {
    this.params.node.setSelected(true);
    this.params.context.componentParent.GridCheckCellClicked(this.params.node.rowIndex, this.params.colDef.headerName,event);
   
  }

  refresh(): boolean {
    return false;
  }

}

