import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-rfqbutton-renderer',
  template: '<span><button (click)="invokeParentMethod()" style="padding:1px 20px; margin-bottom:10px; background-color: #ff7a00;  border: #ff3300;" class="btn btn-primary" >Quotation </button></span>'
})
export class QuotationenterRendererComponent implements ICellRendererAngularComp {

  
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridQuotationCellClicked(this.params.node);

  }

  refresh(): boolean {
    return false;
  }
}

/*#8000b2*/
