import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-poapprovalpopup',
  templateUrl: './poapprovalpopup.component.html',
  styleUrls: ['./poapprovalpopup.component.scss']
})
export class PoapprovalpopupComponent implements OnInit {

  constructor
    (
    public dialogRef: MatDialogRef<PoapprovalpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit()
  {
  }

  OnReject(): void {
    this.dialogRef.close();
  }

  onApproval(): void {
    this.dialogRef.close();
  }

}
