import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-rfqbutton-renderer',
  template: '<span><button (click)="invokeParentMethod()" style="padding:1px 40px; margin-bottom:30px;" class="btn btn-danger" >RFQ</button></span>'
})
export class RfqbuttonRenderer implements ICellRendererAngularComp {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridRFQCellClicked();

  }

  refresh(): boolean {
    return false;
  }

}
