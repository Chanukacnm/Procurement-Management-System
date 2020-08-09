import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({

  selector: 'app-attachedquo-renderer',
  template: '<span><button (click)="invokeParentMethod()" style="padding:0px 10px;  margin-bottom:30px;" class="btn btn-primary" >Attached Quatation</button></span>'
})
export class QuotationattachedpopupRenderer implements ICellRendererAngularComp{

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
