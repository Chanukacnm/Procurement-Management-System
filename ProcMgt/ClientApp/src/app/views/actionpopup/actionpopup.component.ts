import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Approvalscreen } from '../../models/approvalscreen';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actionpopup',
  templateUrl: './actionpopup.component.html',
  styleUrls: ['./actionpopup.component.scss']
})
export class ActionpopupComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ActionpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onApprove(): void {


    Swal.fire({

      text: 'Approved Successfully',

      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#61CD23'

    });
    //alert('Approved Successfully');
    this.dialogRef.close();
  }

  onReject(): void {

    Swal.fire({

      text: 'Rejected Successfully',

      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#61CD23'

    });

    //alert('Rejected Successfully');
    this.dialogRef.close(this.data);
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {
    
  }


}
