import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rfqpopup',
  templateUrl: './rfqpopup.component.html',
  styleUrls: ['./rfqpopup.component.scss']
})
export class RfqpopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RfqpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
}

onReject(): void {
  this.dialogRef.close(this.data);
}

}
