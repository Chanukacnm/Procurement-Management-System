import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Quotationrequestdetails } from '../../../models/quotationrequestdetails';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker-renderer',
  template: `<input class="form-control" id="quotationValidateDate" style="margin-bottom:60px;" type="date" name="quotationValidate-date" (ngModelChange)="datechanged($event)" [(ngModel)]="selectedDate" >`
})
export class DatepickerRenderer implements ICellRendererAngularComp {

  public params: any;
  private selectedDate = '';
  objQuotationEnter: Quotationrequestdetails;

  agInit(params: any): void {
    this.params = params;
    this.objQuotationEnter = new Quotationrequestdetails();
  }
  

  datechanged(objdate) {
    this.selectedDate = objdate;
    console.log("yyyy=>", objdate);
    console.log("rrrr=>", this.selectedDate);
    //this.params.context.componentParent.GridDateCellClicked(objdate);
    

    var quotationValidDate = moment(objdate, 'YYYY-MM-DD');
    this.params.node.data.QuotationValidDate = (moment(quotationValidDate).format('MM/DD/YYYY'));
    this.params.context.componentParent.GridDate2CellClicked(this.params.node.data.QuotationValidDate);
    

  }

  refresh(): boolean {
    return false;
  }

}
