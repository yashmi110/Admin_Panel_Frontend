import { UserDetailService } from './user-detail/user-detail.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'  ;
import {MatDialogModule} from '@angular/material/dialog';
//import {MatFormFieldModule} from '@angular/material/form-field';


import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EmailEditComponent } from './email-edit/email-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeLoginComponent,
    UserDetailComponent,
    EmailEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [UserDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
