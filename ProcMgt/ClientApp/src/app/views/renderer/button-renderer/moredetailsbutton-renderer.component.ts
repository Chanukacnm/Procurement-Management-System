import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-moredetailsbutton-renderer',
  template: `<span><button (click)="invokeParentMethod()" class="btn btn-block btn-link">More Details</button></span>`
})
export class MoredetailsbuttonRenderer implements OnInit, ICellRendererAngularComp {

  public params: any;

  ngOnInit() {
  }

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.GridMoreDetailsCellClicked(this.params.node, this.params.colDef.headerName);
  }

  refresh(): boolean {
    return false;
  }

}
