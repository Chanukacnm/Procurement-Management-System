import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-arnpopup',
  templateUrl: './arnpopup.component.html',
  styleUrls: ['./arnpopup.component.scss']
})
export class ArnpopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArnpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onApprove(): void {
    this.dialogRef.close();
  }

  onReject(): void {
    this.dialogRef.close(this.data);
  }

}
