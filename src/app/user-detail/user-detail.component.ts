import { UserDetailService } from './user-detail.service';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmailEditComponent } from '../email-edit/email-edit.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
  
})

export class UserDetailComponent implements OnInit {

  constructor(private userdetailservice: UserDetailService , public dialog: MatDialog) { }


  openDialog(data: any) {
    let dialogRef = this.dialog.open(EmailEditComponent, {
      data: {
        email: data.email,
        username: data.username
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      this.userdetailservice.updateEmail(res.email, res.username).subscribe(  (data: any) => {
     
        console.log(data)
        this.loadData()
        
       },
       error => {
   
        console.log(error)
       })

     
    })
  }

  deleteUser(data : any){
    this.userdetailservice.deleteUser(data.username).subscribe(  (data: any) => {
     
      if (data == "NOT_FOUND") {
          
      } else {
        this.loadData()
      }
      
      
     },
     error => {
 
      console.log(error)
     })


  }




  displayedColumns: string[] = ['username', 'email','action'];
  dataSource:  UserDetails[] = []

  ngOnInit(){

   this.loadData()

  }

  loadData() {
    this.userdetailservice.getAllUsers().subscribe(  (data: [UserDetails]) => {
     
      this.dataSource = data
     },
     error => {
 
      console.log(error)
     })
  }

}

export class UserDetails{
  username : string = " "
  email : string = " "
  action : string = " "
}
