import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { DialogData } from '../user-detail/user-detail.component';

export interface DialogData {
  email: "";
  username: "";
}


@Component({
  selector: 'app-email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.scss']
})
export class EmailEditComponent implements OnInit {
  //dialogRef: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<EmailEditComponent>,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
  
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }

}
