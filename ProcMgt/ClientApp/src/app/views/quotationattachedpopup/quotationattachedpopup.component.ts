import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-quotationattachedpopup',
  templateUrl: './quotationattachedpopup.component.html',
  styleUrls: ['./quotationattachedpopup.component.scss']
})
export class QuotationattachedpopupComponent implements OnInit {

  constructor
    (
    public dialogRef: MatDialogRef<QuotationattachedpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onReject(): void {
    this.dialogRef.close(this.data);
  }
  onSave() {
  }
  reset() {
  }
}
