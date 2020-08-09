import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.scss']
})
export class DeletepopupComponent implements OnInit {

  constructor
    (
    public dialogRef: MatDialogRef<DeletepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
  ngOnInit()
  {

  }

  onReject(): void
  {
    this.dialogRef.close(this.data);
  }

  onApprove(): void {
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }

}
