import { EmployeeLoginService } from './employee-login.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss'],
  providers: [EmployeeLoginComponent]
})
export class EmployeeLoginComponent implements OnInit{

  formLogin!: FormGroup;
  login!: Login;

  formRegister!: FormGroup;
  register!: Register;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  confirmpassword = new FormControl('', [Validators.required])
 // username: any;

  getErrorMessage() {
    if (this.email.hasError('required')||this.password.hasError('required')||this.confirmpassword.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  constructor(private formBuilder: FormBuilder, private employeeloginservice : EmployeeLoginService, private toastr: ToastrService) { 
   
  }

  ngOnInit(): void {
   this.login = new Login();
   this.createLoginForm();

   this.register = new Register();
  this.createRegisterForm();

  }


  createLoginForm(){
    const model={
      username : new FormControl(this.login.username, [Validators.required]),
      password : new FormControl(this.login.password, [Validators.required])
    };
    this.formLogin=this.formBuilder.group(model);
  }

  createRegisterForm(){
    const model={
      username : new FormControl(this.register.username,  [Validators.required]),
      email:new FormControl(this.register.email, [Validators.required]),
      password : new FormControl(this.register.password, [Validators.required]),
      confirmpassword: new FormControl(this.register.confirmpassword, [Validators.required])
    };
    this.formRegister=this.formBuilder.group(model);
  }

  loginBtnTap() {
  
    if(this.formLogin.valid){
      const value = this.formLogin.value;

      // this.employeeloginservice.loginEmployee(value).subscribe((data: LoginEmployee) => {
      //   console.log(data.token)
      //   this.toastr.success('Logging successfull', 'Success');
      // });

      this.employeeloginservice.loginEmployee(value).subscribe(
        (data: LoginEmployee) => {
          console.log(data.token)
          this.toastr.success('Logging successfull', 'Success');
        },
        error => {
          
          this.toastr.error('Invalid User Creditatioal', 'fail');
        }
      );

      
    }
  }


  registerBtnTap(){
    this.username.markAsTouched()
    this.email.markAsTouched()
    this.password.markAsTouched()
    this.confirmpassword.markAsTouched()

    if (this.formRegister.valid){
      const value = this.formRegister.value;

      this.employeeloginservice.registerEmployee(value).subscribe(
        success=>{
          this.toastr.success('Registration successfull', 'Success');
        },
        error=>{
          this.toastr.error('Please reEnter', 'fail');
        }
        
        
      );

    }
  }

}

export class Login{
   username:string = "";
   password: string = "";

}

export class LoginEmployee{
  token:string = '';
}

export class Register{
  username:string = "";
  email:string = "";
   password: string = "";
   confirmpassword: string = "";
}